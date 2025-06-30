import { io, Socket } from 'socket.io-client';
import { tokenManager } from '@/api/api';
import logger from '@/lib/logger';

// Define SocketManager as a Singleton
class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;
  private namespaces: Record<string, Socket> = {};
  private reconnectAttempts: Record<string, number> = {};
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second delay
  private pollingFallback = false;
  private toastCallback?: (title: string, message: string, type: string) => void;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private healthStatus: 'healthy' | 'degraded' | 'offline' = 'healthy';
  
  // Private constructor
  private constructor() {}
  
  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }
  
  /**
   * Set toast notification callback
   * @param callback Function to show toast notifications
   */
  public setToastCallback(callback: (title: string, message: string, type: string) => void): void {
    this.toastCallback = callback;
  }
  
  /**
   * Initialize the main socket connection
   */
  public initialize(): Socket {
    if (!this.socket) {
      const baseURL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080';
      this.socket = io(baseURL, {
        transports: this.pollingFallback ? ['polling', 'websocket'] : ['websocket'],
        autoConnect: false,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        timeout: 10000, // 10 second connection timeout
        auth: {
          token: () => tokenManager.getAuthToken()
        }
      });
      
      // Set up default event listeners
      this.setupDefaultListeners(this.socket, 'main');
      
      // Set up health check ping/pong
      this.setupHealthCheck(this.socket);
    }
    
    return this.socket;
  }
  
  /**
   * Set up health check ping/pong for a socket
   * @param socket The socket to set up health check for
   */
  private setupHealthCheck(socket: Socket): void {
    // Clear any existing interval
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    // Set up ping/pong handlers
    socket.on('health:ping', (data: any) => {
      // Respond immediately with a pong
      socket.emit('health:pong', {
        timestamp: data.timestamp,
        serverTime: Date.now()
      });
    });
    
    socket.on('health:status', (data: { status: 'healthy' | 'degraded' | 'offline' }) => {
      this.healthStatus = data.status;
      
      // Notify about degraded service
      if (data.status === 'degraded') {
        this.showNotification(
          'Service Degraded',
          'The server is experiencing issues. Some features may be unavailable.',
          'warning'
        );
      } else if (data.status === 'healthy' && this.healthStatus !== 'healthy') {
        this.showNotification(
          'Service Restored',
          'The server is operating normally again.',
          'success'
        );
      }
    });
    
    // Start health check interval when connected
    socket.on('connect', () => {
      // Start health check interval (every 30 seconds)
      this.healthCheckInterval = setInterval(() => {
        if (socket.connected) {
          const startTime = Date.now();
          
          // Set timeout for pong response
          const timeoutId = setTimeout(() => {
            logger.warn('Health check timeout', 'socket-manager');
            
            // Update health status to degraded if we don't get a response
            if (this.healthStatus === 'healthy') {
              this.healthStatus = 'degraded';
              this.showNotification(
                'Connection Issues',
                'The connection to the server is experiencing delays.',
                'warning'
              );
            }
          }, 5000); // 5 second timeout
          
          // Send ping and wait for pong
          socket.emit('health:ping', { timestamp: startTime });
          
          socket.once('health:pong', () => {
            clearTimeout(timeoutId);
            
            // Calculate latency
            const latency = Date.now() - startTime;
            
            // Log high latency
            if (latency > 1000) {
              logger.warn(`High latency detected: ${latency}ms`, 'socket-manager');
            }
            
            // If previously degraded but now responsive, update status
            if (this.healthStatus === 'degraded') {
              this.healthStatus = 'healthy';
              this.showNotification(
                'Connection Restored',
                'The connection to the server has improved.',
                'success'
              );
            }
          });
        }
      }, 30000); // 30 second interval
    });
    
    // Clear interval on disconnect
    socket.on('disconnect', () => {
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
        this.healthCheckInterval = null;
      }
      
      this.healthStatus = 'offline';
    });
  }
  
  /**
   * Get or create a namespace connection
   * @param namespace The namespace to connect to
   */
  public getNamespace(namespace: string): Socket {
    if (!this.namespaces[namespace]) {
      const baseURL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080';
      this.namespaces[namespace] = io(`${baseURL}/${namespace}`, {
        transports: this.pollingFallback ? ['polling', 'websocket'] : ['websocket'],
        autoConnect: false,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        auth: {
          token: () => tokenManager.getAuthToken()
        }
      });
      
      // Set up default event listeners
      this.setupDefaultListeners(this.namespaces[namespace], namespace);
      
      // Initialize reconnect attempts counter
      this.reconnectAttempts[namespace] = 0;
    }
    
    return this.namespaces[namespace];
  }
  
  /**
   * Connect to the main socket
   */
  public connect(): Promise<void> {
    if (!this.socket) {
      this.initialize();
    }
    
    return new Promise((resolve, reject) => {
      this.socket!.connect();
      
      this.socket!.once('connect', () => {
        // Reset reconnect attempts on successful connection
        this.reconnectAttempts['main'] = 0;
        resolve();
      });
      
      this.socket!.once('connect_error', (error) => {
        reject(error);
      });
    });
  }
  
  /**
   * Connect to a specific namespace
   * @param namespace The namespace to connect to
   */
  public connectNamespace(namespace: string): Promise<void> {
    const namespaceSocket = this.getNamespace(namespace);
    
    return new Promise((resolve, reject) => {
      namespaceSocket.connect();
      
      namespaceSocket.once('connect', () => {
        // Reset reconnect attempts on successful connection
        this.reconnectAttempts[namespace] = 0;
        resolve();
      });
      
      namespaceSocket.once('connect_error', (error) => {
        reject(error);
      });
    });
  }
  
  /**
   * Disconnect the main socket
   */
  public disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }
  
  /**
   * Disconnect from a specific namespace
   * @param namespace The namespace to disconnect from
   */
  public disconnectNamespace(namespace: string): void {
    if (this.namespaces[namespace] && this.namespaces[namespace].connected) {
      this.namespaces[namespace].disconnect();
    }
  }
  
  /**
   * Disconnect from all sockets
   */
  public disconnectAll(): void {
    this.disconnect();
    
    Object.keys(this.namespaces).forEach(namespace => {
      this.disconnectNamespace(namespace);
    });
  }
  
  /**
   * Set up default event listeners for a socket
   * @param socket The socket to set up listeners for
   * @param namespaceName The name of the namespace
   */
  private setupDefaultListeners(socket: Socket, namespaceName: string): void {
    socket.on('connect', () => {
      logger.info(`Socket connected: ${namespaceName}`, 'socket-manager');
      
      // Show notification
      this.showNotification(
        'Connection Established',
        `Successfully connected to ${namespaceName}`,
        'success'
      );
    });
    
    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected: ${namespaceName}, reason: ${reason}`, 'socket-manager');
      
      // Show notification for unexpected disconnects
      if (reason !== 'io client disconnect') {
        this.showNotification(
          'Connection Lost',
          `Disconnected from ${namespaceName}: ${reason}`,
          'warning'
        );
      }
    });
    
    socket.on('connect_error', (error) => {
      const nsKey = namespaceName;
      this.reconnectAttempts[nsKey] = (this.reconnectAttempts[nsKey] || 0) + 1;
      
      logger.error(`Socket connection error: ${namespaceName}`, 'socket-manager', error);
      
      // Show notification
      this.showNotification(
        'Connection Error',
        `Failed to connect to ${namespaceName}: ${error.message}`,
        'error'
      );
      
      // If we've exceeded max reconnect attempts, try fallback to polling
      if (this.reconnectAttempts[nsKey] >= this.maxReconnectAttempts && !this.pollingFallback) {
        logger.warn(`Falling back to polling transport for ${namespaceName}`, 'socket-manager');
        this.pollingFallback = true;
        
        // Show notification about fallback
        this.showNotification(
          'Connection Fallback',
          'Switching to alternative connection method',
          'warning'
        );
        
        // Reconnect with new transport
        setTimeout(() => {
          if (nsKey === 'main') {
            this.socket = null; // Force re-initialization with new transport
            this.connect().catch(() => {
              logger.error('Failed to connect with fallback transport', 'socket-manager');
            });
          } else {
            delete this.namespaces[nsKey]; // Force re-initialization with new transport
            this.connectNamespace(nsKey).catch(() => {
              logger.error(`Failed to connect to namespace ${nsKey} with fallback transport`, 'socket-manager');
            });
          }
        }, this.reconnectDelay * 2);
      }
      
      // Implement exponential backoff for reconnection
      const delay = Math.min(
        this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts[nsKey]),
        30000 // Max 30 seconds
      );
      
      // Try to reconnect after delay
      setTimeout(() => {
        if (nsKey === 'main') {
          if (!this.socket?.connected) {
            this.connect().catch(() => {
              // Handled by connect_error event
            });
          }
        } else if (!this.namespaces[nsKey]?.connected) {
          this.connectNamespace(nsKey).catch(() => {
            // Handled by connect_error event
          });
        }
      }, delay);
    });
    
    socket.on('error', (error: any) => {
      logger.error(`Socket error: ${namespaceName}`, 'socket-manager', error);
      
      // Show notification
      this.showNotification(
        'Socket Error',
        `An error occurred on ${namespaceName}: ${error.message || 'Unknown error'}`,
        'error'
      );
    });
  }
  
  /**
   * Show a notification using the toast callback if available
   */
  private showNotification(title: string, message: string, type: string): void {
    if (this.toastCallback) {
      this.toastCallback(title, message, type);
    }
  }
  
  /**
   * Emit an event on the main socket
   * @param event The event name
   * @param data The data to emit
   */
  public emit(event: string, data: any): void {
    if (!this.socket) {
      this.initialize();
      this.connect().catch((error) => {
        logger.error('Error connecting to socket:', 'socket-manager', error);
      });
    }
    
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      // Log without additional metadata to avoid TypeScript errors
      logger.error(`Socket not connected, cannot emit event: ${event}`, 'socket-manager');
    }
  }
  
  /**
   * Emit an event on a namespace socket
   * @param namespace The namespace to emit on
   * @param event The event name
   * @param data The data to emit
   */
  public emitToNamespace(namespace: string, event: string, data: any): void {
    const namespaceSocket = this.getNamespace(namespace);
    
    if (!namespaceSocket.connected) {
      this.connectNamespace(namespace).catch((error) => {
        logger.error(`Error connecting to namespace ${namespace}:`, 'socket-manager', error);
      });
    }
    
    if (namespaceSocket.connected) {
      namespaceSocket.emit(event, data);
    } else {
      // Log without additional metadata to avoid TypeScript errors
      logger.error(`Namespace socket ${namespace} not connected, cannot emit event: ${event}`, 'socket-manager');
    }
  }
  
  /**
   * Listen for an event on the main socket
   * @param event The event name to listen for
   * @param callback The callback to call when the event is received
   */
  public on(event: string, callback: (data: any) => void): void {
    if (!this.socket) {
      this.initialize();
      this.connect().catch((error) => {
        logger.error('Error connecting to socket:', 'socket-manager', error);
      });
    }
    
    this.socket!.on(event, callback);
  }
  
  /**
   * Listen for an event on a namespace socket
   * @param namespace The namespace to listen on
   * @param event The event name to listen for
   * @param callback The callback to call when the event is received
   */
  public onNamespace(namespace: string, event: string, callback: (data: any) => void): void {
    const namespaceSocket = this.getNamespace(namespace);
    
    if (!namespaceSocket.connected) {
      this.connectNamespace(namespace).catch((error) => {
        logger.error(`Error connecting to namespace ${namespace}:`, 'socket-manager', error);
      });
    }
    
    namespaceSocket.on(event, callback);
  }
  
  /**
   * Remove an event listener on the main socket
   * @param event The event name
   * @param callback The callback to remove
   */
  public off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
  
  /**
   * Remove an event listener on a namespace socket
   * @param namespace The namespace
   * @param event The event name
   * @param callback The callback to remove
   */
  public offNamespace(namespace: string, event: string, callback?: (data: any) => void): void {
    if (this.namespaces[namespace]) {
      this.namespaces[namespace].off(event, callback);
    }
  }
  
  /**
   * Get the current health status of the connection
   */
  public getHealthStatus(): 'healthy' | 'degraded' | 'offline' {
    if (!this.socket || !this.socket.connected) {
      return 'offline';
    }
    return this.healthStatus;
  }
}

// Export the singleton instance
const socketManager = SocketManager.getInstance();
export default socketManager; 