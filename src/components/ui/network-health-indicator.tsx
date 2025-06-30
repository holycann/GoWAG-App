"use client";

import React from "react";
import { useNetworkHealth } from "@/hooks/use-network-health";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Progress } from "./progress";
import { Badge } from "./badge";
import { Wifi, WifiOff, Activity, AlertCircle } from "lucide-react";

interface NetworkHealthIndicatorProps {
  className?: string;
  showLatency?: boolean;
  showQualityLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function NetworkHealthIndicator({
  className,
  showLatency = true,
  showQualityLabel = false,
  size = "md",
}: NetworkHealthIndicatorProps) {
  const {
    latency,
    connectionQuality,
    isOnline,
    isConnected,
    isHealthy,
    consecutiveFailedPings,
  } = useNetworkHealth();

  const getQualityColor = () => {
    if (!isOnline) return "bg-destructive";
    if (!isConnected) return "bg-amber-500";
    
    switch (connectionQuality) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-emerald-500";
      case "fair":
        return "bg-amber-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const getQualityProgress = () => {
    if (!isOnline || !isConnected) return 0;
    
    switch (connectionQuality) {
      case "excellent":
        return 100;
      case "good":
        return 75;
      case "fair":
        return 50;
      case "poor":
        return 25;
      default:
        return 0;
    }
  };

  const getQualityText = () => {
    if (!isOnline) return "Offline";
    if (!isConnected) return "Disconnected";
    
    return connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1);
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className={iconClasses} />;
    if (!isConnected) return <AlertCircle className={iconClasses} />;
    if (connectionQuality === "unknown") return <Activity className={iconClasses} />;
    return <Wifi className={iconClasses} />;
  };

  const iconClasses = cn(
    size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  );

  const tooltipContent = (
    <div className="space-y-2 p-1">
      <div className="text-xs font-medium">Network Status</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span className="text-muted-foreground">Status:</span>
        <span>{isOnline ? (isConnected ? "Connected" : "Disconnected") : "Offline"}</span>
        
        <span className="text-muted-foreground">Quality:</span>
        <span>{getQualityText()}</span>
        
        <span className="text-muted-foreground">Latency:</span>
        <span>{latency ? `${latency}ms` : "Unknown"}</span>
        
        <span className="text-muted-foreground">Health:</span>
        <span>{isHealthy ? "Healthy" : `Degraded (${consecutiveFailedPings} failed pings)`}</span>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-md",
              size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs",
              className
            )}
          >
            <div className={cn("flex h-full items-center")}>
              {getStatusIcon()}
            </div>
            
            {showLatency && isConnected && latency && (
              <span className="tabular-nums">
                {latency}ms
              </span>
            )}
            
            {showQualityLabel && (
              <Badge
                variant="outline"
                className={cn(
                  "px-1.5 py-0 text-[10px] font-normal",
                  size === "sm" ? "h-4" : size === "lg" ? "h-6" : "h-5"
                )}
              >
                {getQualityText()}
              </Badge>
            )}
            
            <div className="h-1.5 w-8 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full transition-all", getQualityColor())}
                style={{ width: `${getQualityProgress()}%` }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 