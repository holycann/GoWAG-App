import { useState, useEffect, useCallback } from 'react';
import { useSocket } from '@/context/socket-context';
import logger from '@/lib/logger';

export interface NetworkStats {
  latency: number | null;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';
  isOnline: boolean;
  isConnected: boolean;
  lastPingTime: number | null;
  failedPings: number;
  consecutiveFailedPings: number;
}

export interface NetworkHealthOptions {
  pingInterval?: number; // milliseconds
  pingTimeout?: number; // milliseconds
  pingEvent?: string;
  pongEvent?: string;
  maxConsecutiveFailedPings?: number;
}

export function useNetworkHealth(options: NetworkHealthOptions = {}) {
  const {
    pingInterval = 30000, // 30 seconds
    pingTimeout = 5000, // 5 seconds
    pingEvent = 'health:ping',
    pongEvent = 'health:pong',
    maxConsecutiveFailedPings = 3
  } = options;

  const { isConnected, getSocket } = useSocket();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [stats, setStats] = useState<NetworkStats>({
    latency: null,
    connectionQuality: 'unknown',
    isOnline: navigator.onLine,
    isConnected: false,
    lastPingTime: null,
    failedPings: 0,
    consecutiveFailedPings: 0
  });

  // Update online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update connected status
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      isConnected,
      isOnline
    }));
  }, [isConnected, isOnline]);

  // Ping function to measure latency
  const ping = useCallback(async (): Promise<number | null> => {
    const socket = getSocket();
    if (!socket || !isConnected) {
      return null;
    }

    return new Promise<number | null>((resolve) => {
      const startTime = Date.now();
      let timeoutId: NodeJS.Timeout;

      // Set up timeout to handle no response
      timeoutId = setTimeout(() => {
        socket.off(pongEvent);
        logger.warn(`Ping timeout after ${pingTimeout}ms`, 'network-health');
        setStats(prev => ({
          ...prev,
          consecutiveFailedPings: prev.consecutiveFailedPings + 1,
          failedPings: prev.failedPings + 1
        }));
        resolve(null);
      }, pingTimeout);

      // Listen for pong response
      socket.once(pongEvent, () => {
        clearTimeout(timeoutId);
        const latency = Date.now() - startTime;
        resolve(latency);
      });

      // Send ping
      try {
        socket.emit(pingEvent, { timestamp: startTime });
      } catch (error) {
        clearTimeout(timeoutId);
        logger.error('Error sending ping', 'network-health', error as Error);
        setStats(prev => ({
          ...prev,
          consecutiveFailedPings: prev.consecutiveFailedPings + 1,
          failedPings: prev.failedPings + 1
        }));
        resolve(null);
      }
    });
  }, [getSocket, isConnected, pingEvent, pongEvent, pingTimeout]);

  // Determine connection quality based on latency
  const getConnectionQuality = useCallback((latency: number | null): NetworkStats['connectionQuality'] => {
    if (latency === null) return 'unknown';
    if (latency < 100) return 'excellent';
    if (latency < 300) return 'good';
    if (latency < 600) return 'fair';
    return 'poor';
  }, []);

  // Periodically ping to measure network health
  useEffect(() => {
    if (!isConnected || !isOnline) {
      return;
    }

    const pingServer = async () => {
      const latency = await ping();
      
      if (latency !== null) {
        // Successful ping
        setStats(prev => ({
          ...prev,
          latency,
          connectionQuality: getConnectionQuality(latency),
          lastPingTime: Date.now(),
          consecutiveFailedPings: 0
        }));
      } else {
        // Failed ping - check if we've reached the threshold
        setStats(prev => {
          const newConsecutiveFailedPings = prev.consecutiveFailedPings + 1;
          const newStats = {
            ...prev,
            latency: null,
            connectionQuality: 'unknown',
            lastPingTime: Date.now(),
            failedPings: prev.failedPings + 1,
            consecutiveFailedPings: newConsecutiveFailedPings
          };
          
          // Log warning if we've reached the threshold
          if (newConsecutiveFailedPings >= maxConsecutiveFailedPings) {
            logger.warn(
              `Network health degraded: ${newConsecutiveFailedPings} consecutive failed pings`,
              'network-health'
            );
          }
          
          return newStats;
        });
      }
    };

    // Initial ping
    pingServer();

    // Set up interval
    const intervalId = setInterval(pingServer, pingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [isConnected, isOnline, ping, pingInterval, getConnectionQuality, maxConsecutiveFailedPings]);

  return {
    ...stats,
    isHealthy: stats.consecutiveFailedPings < maxConsecutiveFailedPings,
    ping // Expose ping function for manual checks
  };
} 