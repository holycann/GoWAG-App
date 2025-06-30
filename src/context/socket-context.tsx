"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { useUI } from "./ui-context";
import socketManager from "@/lib/socket";
import { Socket } from "socket.io-client";
import { 
  CONNECTION_EVENTS, 
  GENERAL_EVENTS, 
  SOCKET_NAMESPACES 
} from "@/services/socket-events";
import logger from "@/lib/logger";

// Define socket context types
interface SocketContextType {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  getSocket: () => Socket | null;
  getNamespace: (namespace: string) => Socket | null;
  connectNamespace: (namespace: string) => Promise<void>;
  disconnectNamespace: (namespace: string) => void;
  healthStatus: 'healthy' | 'degraded' | 'offline';
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useUI();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'degraded' | 'offline'>('offline');
  
  // Initialize socket connection when authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      // Set up toast notification handler
      socketManager.setToastCallback((title, message, type) => {
        showNotification(title, message, type as "default" | "success" | "error" | "warning");
      });
      
      // Initialize the main socket
      const socket = socketManager.initialize();
      
      // Set up global event listeners
      socket.on(CONNECTION_EVENTS.CONNECT, handleConnect);
      socket.on(CONNECTION_EVENTS.DISCONNECT, handleDisconnect);
      socket.on(CONNECTION_EVENTS.CONNECT_ERROR, handleConnectError);
      socket.on(GENERAL_EVENTS.SYSTEM_NOTIFICATION, handleSystemNotification);
      
      // Try to connect if authenticated
      connect();
      
      // Clean up event listeners on unmount
      return () => {
        socket.off(CONNECTION_EVENTS.CONNECT, handleConnect);
        socket.off(CONNECTION_EVENTS.DISCONNECT, handleDisconnect);
        socket.off(CONNECTION_EVENTS.CONNECT_ERROR, handleConnectError);
        socket.off(GENERAL_EVENTS.SYSTEM_NOTIFICATION, handleSystemNotification);
        
        // Disconnect all sockets
        disconnect();
      };
    }
  }, [isAuthenticated]);
  
  // Handle socket connection
  const handleConnect = () => {
    setIsConnected(true);
    logger.info('Socket connected', 'socket-context');
  };
  
  // Handle socket disconnection
  const handleDisconnect = (reason: string) => {
    setIsConnected(false);
    logger.info(`Socket disconnected: ${reason}`, 'socket-context');
  };
  
  // Handle connection errors
  const handleConnectError = (error: Error) => {
    setIsConnected(false);
    logger.error('Socket connection error', 'socket-context', error);
  };
  
  // Handle system notifications
  const handleSystemNotification = (data: { title: string; message: string; type: string }) => {
    showNotification(
      data.title,
      data.message,
      data.type as "default" | "success" | "error" | "warning"
    );
  };
  
  // Connect to main socket
  const connect = async (): Promise<void> => {
    if (!isAuthenticated()) {
      logger.warn('Cannot connect socket: Not authenticated', 'socket-context');
      return;
    }
    
    try {
      await socketManager.connect();
      setIsConnected(true);
    } catch (error) {
      logger.error('Failed to connect socket', 'socket-context', error as Error);
    }
  };
  
  // Disconnect from main socket
  const disconnect = (): void => {
    socketManager.disconnectAll();
    setIsConnected(false);
  };
  
  // Get main socket instance
  const getSocket = (): Socket | null => {
    return socketManager.initialize();
  };
  
  // Get namespace socket instance
  const getNamespace = (namespace: string): Socket | null => {
    return socketManager.getNamespace(namespace);
  };
  
  // Connect to a namespace
  const connectNamespace = async (namespace: string): Promise<void> => {
    if (!isAuthenticated()) {
      logger.warn(`Cannot connect to namespace ${namespace}: Not authenticated`, 'socket-context');
      return;
    }
    
    try {
      await socketManager.connectNamespace(namespace);
      logger.info(`Connected to namespace: ${namespace}`, 'socket-context');
    } catch (error) {
      logger.error(`Failed to connect to namespace ${namespace}`, 'socket-context', error as Error);
      throw error;
    }
  };
  
  // Disconnect from a namespace
  const disconnectNamespace = (namespace: string): void => {
    socketManager.disconnectNamespace(namespace);
    logger.info(`Disconnected from namespace: ${namespace}`, 'socket-context');
  };
  
  // Update health status periodically
  useEffect(() => {
    if (isConnected) {
      const updateHealthStatus = () => {
        const socket = getSocket();
        if (socket) {
          const status = socketManager.getHealthStatus();
          setHealthStatus(status);
        }
      };
      
      // Initial update
      updateHealthStatus();
      
      // Set interval to update health status
      const intervalId = setInterval(updateHealthStatus, 10000);
      
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setHealthStatus('offline');
    }
  }, [isConnected]);
  
  return (
    <SocketContext.Provider
      value={{
        isConnected,
        connect,
        disconnect,
        getSocket,
        getNamespace,
        connectNamespace,
        disconnectNamespace,
        healthStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketContext; 