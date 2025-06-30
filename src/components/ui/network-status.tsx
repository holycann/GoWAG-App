"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socket-context";
import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface NetworkStatusProps {
  className?: string;
  showReconnectButton?: boolean;
  variant?: "minimal" | "badge" | "full";
}

export function NetworkStatus({
  className,
  showReconnectButton = true,
  variant = "badge",
}: NetworkStatusProps) {
  const { isConnected, connect } = useSocket();
  const { showNotification } = useUI();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Monitor browser online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showNotification(
        "Network Connection Restored",
        "Your device is now connected to the internet",
        "success"
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      showNotification(
        "Network Connection Lost",
        "Your device is offline. Some features may be unavailable",
        "warning"
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [showNotification]);

  // Handle manual reconnection
  const handleReconnect = async () => {
    if (!isOnline) {
      showNotification(
        "Reconnection Failed",
        "Your device is offline. Please check your internet connection",
        "error"
      );
      return;
    }

    setIsReconnecting(true);
    try {
      await connect();
      showNotification(
        "Reconnection Successful",
        "You are now connected to the server",
        "success"
      );
    } catch (error) {
      showNotification(
        "Reconnection Failed",
        "Could not connect to the server. Please try again later",
        "error"
      );
    } finally {
      setIsReconnecting(false);
    }
  };

  // Render minimal variant (icon only)
  if (variant === "minimal") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("cursor-help", className)}>
              {!isOnline ? (
                <WifiOff className="h-4 w-4 text-destructive" />
              ) : isConnected ? (
                <Wifi className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-warning" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {!isOnline
              ? "You are offline. Check your internet connection."
              : isConnected
              ? "Connected to server"
              : "Connected to internet but not to server"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Render badge variant
  if (variant === "badge") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Badge
          variant={
            !isOnline ? "destructive" : isConnected ? "default" : "outline"
          }
          className={cn(
            "gap-1.5",
            isConnected && "bg-green-600 hover:bg-green-600/80"
          )}
        >
          {!isOnline ? (
            <>
              <WifiOff className="h-3 w-3" />
              <span>Offline</span>
            </>
          ) : isConnected ? (
            <>
              <Wifi className="h-3 w-3" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3" />
              <span>Disconnected</span>
            </>
          )}
        </Badge>
        {showReconnectButton && !isConnected && isOnline && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={handleReconnect}
            disabled={isReconnecting}
          >
            <RefreshCw
              className={cn(
                "h-3 w-3 mr-1",
                isReconnecting && "animate-spin"
              )}
            />
            Reconnect
          </Button>
        )}
      </div>
    );
  }

  // Render full variant (default)
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border p-3",
        !isOnline
          ? "border-destructive/50 bg-destructive/10"
          : isConnected
          ? "border-green-500/50 bg-green-500/10"
          : "border-amber-500/50 bg-amber-500/10",
        className
      )}
    >
      <div>
        {!isOnline ? (
          <WifiOff className="h-5 w-5 text-destructive" />
        ) : isConnected ? (
          <Wifi className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-500" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {!isOnline
            ? "You are offline"
            : isConnected
            ? "Connected to server"
            : "Server connection lost"}
        </p>
        <p className="text-xs text-muted-foreground">
          {!isOnline
            ? "Check your internet connection"
            : isConnected
            ? "All features are available"
            : "Some features may be unavailable"}
        </p>
      </div>
      {showReconnectButton && !isConnected && isOnline && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleReconnect}
          disabled={isReconnecting}
        >
          <RefreshCw
            className={cn("h-3.5 w-3.5 mr-1", isReconnecting && "animate-spin")}
          />
          Reconnect
        </Button>
      )}
    </div>
  );
} 