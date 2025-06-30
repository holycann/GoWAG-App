import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { useUI } from '@/context/ui-context';
import socketManager from '@/lib/socket';
import logger from '@/lib/logger';
import { Socket } from 'socket.io-client';

export interface UseSocketOptions {
  namespace?: string; 
  autoConnect?: boolean;
  events?: Record<string, (data: any) => void>;
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onError?: (error: Error) => void;
  maxReconnectAttempts?: number;
}

export function useSocket(options: UseSocketOptions = {}) {
  const { 
    namespace, 
    autoConnect = true, 
    events = {},
    onConnect: customOnConnect,
    onDisconnect: customOnDisconnect,
    onError: customOnError,
    maxReconnectAttempts = 5
  } = options;
  
  const { isAuthenticated } = useAuth();
  const { showNotification } = useUI();
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
  
  // Initialize socket
  useEffect(() => {
    if (!isAuthenticated()) {
      logger.warn('Cannot initialize socket: Not authenticated', 'use-socket');
      return;
    }
    
    let currentSocket: Socket;
    
    try {
      // Get the socket instance
      if (namespace) {
        currentSocket = socketManager.getNamespace(namespace);
      } else {
        currentSocket = socketManager.initialize();
      }
      
      setSocket(currentSocket);
      
      // Set up event listeners
      currentSocket.on('connect', onConnect);
      currentSocket.on('disconnect', onDisconnect);
      currentSocket.on('connect_error', onConnectError);
      currentSocket.on('error', onError);
      
      // Set up custom event listeners
      Object.entries(events).forEach(([event, handler]) => {
        currentSocket.on(event, handler);
      });
      
      // Connect if autoConnect is true
      if (autoConnect) {
        if (namespace) {
          socketManager.connectNamespace(namespace).catch((err) => {
            setError(err);
            logger.error(`Failed to connect to namespace ${namespace}`, 'use-socket', err);
          });
        } else {
          socketManager.connect().catch((err) => {
            setError(err);
            logger.error('Failed to connect to socket', 'use-socket', err);
          });
        }
      }
    } catch (err) {
      setError(err as Error);
      logger.error('Error initializing socket', 'use-socket', err as Error);
    }
    
    // Clean up
    return () => {
      if (currentSocket) {
        // Remove event listeners
        currentSocket.off('connect', onConnect);
        currentSocket.off('disconnect', onDisconnect);
        currentSocket.off('connect_error', onConnectError);
        currentSocket.off('error', onError);
        
        // Remove custom event listeners
        Object.keys(events).forEach((event) => {
          currentSocket.off(event);
        });
      }
    };
  }, [namespace, isAuthenticated]);
  
  // Handle connection events
  const onConnect = useCallback(() => {
    setIsConnected(true);
    setError(null);
    setReconnectAttempts(0);
    
    logger.info(`Socket connected${namespace ? ` to namespace ${namespace}` : ''}`, 'use-socket');
    
    // Call custom handler if provided
    if (customOnConnect) {
      customOnConnect();
    }
  }, [namespace, customOnConnect]);
  
  const onDisconnect = useCallback((reason: string) => {
    setIsConnected(false);
    
    logger.info(`Socket disconnected${namespace ? ` from namespace ${namespace}` : ''}: ${reason}`, 'use-socket');
    
    // Call custom handler if provided
    if (customOnDisconnect) {
      customOnDisconnect(reason);
    }
  }, [namespace, customOnDisconnect]);
  
  const onConnectError = useCallback((err: Error) => {
    setIsConnected(false);
    setError(err);
    setReconnectAttempts((prev) => prev + 1);
    
    logger.error(`Socket connection error${namespace ? ` for namespace ${namespace}` : ''}`, 'use-socket', err);
    
    // Show notification for connection error
    showNotification(
      'Connection Error',
      `Failed to connect to socket${namespace ? ` (${namespace})` : ''}: ${err.message}`,
      'error'
    );
    
    // If we've exceeded max reconnect attempts, show a notification
    if (reconnectAttempts >= maxReconnectAttempts) {
      showNotification(
        'Connection Failed',
        'Maximum reconnection attempts reached. Please check your connection.',
        'error'
      );
    }
    
    // Call custom handler if provided
    if (customOnError) {
      customOnError(err);
    }
  }, [namespace, reconnectAttempts, maxReconnectAttempts, customOnError, showNotification]);
  
  const onError = useCallback((err: Error) => {
    setError(err);
    
    logger.error(`Socket error${namespace ? ` for namespace ${namespace}` : ''}`, 'use-socket', err);
    
    // Call custom handler if provided
    if (customOnError) {
      customOnError(err);
    }
  }, [namespace, customOnError]);
  
  // Connect manually
  const connect = useCallback(async () => {
    if (!isAuthenticated()) {
      logger.warn('Cannot connect socket: Not authenticated', 'use-socket');
      return;
    }
    
    try {
      if (namespace) {
        await socketManager.connectNamespace(namespace);
      } else {
        await socketManager.connect();
      }
    } catch (err) {
      setError(err as Error);
      logger.error(`Failed to connect socket${namespace ? ` to namespace ${namespace}` : ''}`, 'use-socket', err as Error);
      throw err;
    }
  }, [namespace, isAuthenticated]);
  
  // Disconnect manually
  const disconnect = useCallback(() => {
    if (namespace) {
      socketManager.disconnectNamespace(namespace);
    } else {
      socketManager.disconnect();
    }
  }, [namespace]);
  
  // Emit an event
  const emit = useCallback((event: string, data: any) => {
    if (!socket || !isConnected) {
      logger.warn(`Cannot emit event ${event}: Socket not connected`, 'use-socket');
      return false;
    }
    
    try {
      if (namespace) {
        socketManager.emitToNamespace(namespace, event, data);
      } else {
        socketManager.emit(event, data);
      }
      return true;
    } catch (err) {
      logger.error(`Error emitting event ${event}`, 'use-socket', err as Error);
      return false;
    }
  }, [socket, isConnected, namespace]);
  
  // Listen for an event
  const on = useCallback((event: string, handler: (data: any) => void) => {
    if (!socket) {
      logger.warn(`Cannot listen for event ${event}: Socket not initialized`, 'use-socket');
      return;
    }
    
    if (namespace) {
      socketManager.onNamespace(namespace, event, handler);
    } else {
      socketManager.on(event, handler);
    }
  }, [socket, namespace]);
  
  // Remove event listener
  const off = useCallback((event: string, handler?: (data: any) => void) => {
    if (!socket) {
      return;
    }
    
    if (namespace) {
      socketManager.offNamespace(namespace, event, handler);
    } else {
      socketManager.off(event, handler);
    }
  }, [socket, namespace]);
  
  return {
    socket,
    isConnected,
    error,
    reconnectAttempts,
    connect,
    disconnect,
    emit,
    on,
    off
  };
} 