// Network Status Page

"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/socket-context";
import { useNetworkHealth } from "@/hooks/use-network-health";
import { formatLatency } from "@/lib/utils";
import { NetworkStatus } from "@/components/ui/network-status";
import { NetworkHealthIndicator } from "@/components/ui/network-health-indicator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, WifiOff, RefreshCw, Activity, AlertCircle, Clock, Server, BarChart3 } from "lucide-react";

export default function NetworkStatusPage() {
  const { isConnected, connect, healthStatus } = useSocket();
  const { 
    latency, 
    connectionQuality, 
    isOnline, 
    failedPings, 
    lastPingTime, 
    ping, 
    isHealthy 
  } = useNetworkHealth();
  
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [manualPingResult, setManualPingResult] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [pingHistory, setPingHistory] = useState<{time: number, latency: number | null}[]>([]);
  
  // Add latency to history
  useEffect(() => {
    if (latency !== null) {
      setPingHistory(prev => {
        const newHistory = [...prev, { time: Date.now(), latency }];
        // Keep only the last 20 pings
        return newHistory.slice(-20);
      });
    }
  }, [latency]);
  
  // Handle manual reconnection
  const handleReconnect = async () => {
    if (!isOnline) {
      return;
    }
    
    setIsReconnecting(true);
    try {
      await connect();
    } finally {
      setIsReconnecting(false);
    }
  };
  
  // Handle manual ping
  const handleManualPing = async () => {
    setIsPinging(true);
    setManualPingResult(null);
    
    try {
      const result = await ping();
      setManualPingResult(result);
    } finally {
      setIsPinging(false);
    }
  };
  
  // Get quality color
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
  
  // Get quality progress
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Network Status</h1>
        <p className="text-muted-foreground">
          Monitor your connection to the server and diagnose any issues.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Connection Status Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Connection Status
            </CardTitle>
            <CardDescription>Current connection to the server</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <NetworkStatus variant="full" className="w-full" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">
                  {isOnline ? (isConnected ? "Connected" : "Disconnected") : "Offline"}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Health:</span>
                <span className="font-medium">
                  {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">
                  {lastPingTime ? new Date(lastPingTime).toLocaleTimeString() : "Never"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleReconnect} 
              disabled={isReconnecting || !isOnline} 
              className="w-full"
            >
              {isReconnecting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Reconnecting...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reconnect
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Connection Quality Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Connection Quality
            </CardTitle>
            <CardDescription>Latency and connection metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quality</span>
                <span className="text-sm font-medium">
                  {connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)}
                </span>
              </div>
              <Progress value={getQualityProgress()} className={getQualityColor()} />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Latency:</span>
                <span className="font-medium tabular-nums">
                  {formatLatency(latency)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Manual Ping:</span>
                <span className="font-medium tabular-nums">
                  {manualPingResult !== null ? formatLatency(manualPingResult) : "Not tested"}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Failed Pings:</span>
                <span className="font-medium tabular-nums">
                  {failedPings}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleManualPing} 
              variant="outline" 
              disabled={isPinging || !isConnected} 
              className="w-full"
            >
              {isPinging ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Pinging...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Test Latency
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Network Indicators Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Network Indicators
            </CardTitle>
            <CardDescription>Available network status indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Standard Status</div>
                <div className="flex items-center gap-4">
                  <NetworkStatus variant="minimal" />
                  <NetworkStatus variant="badge" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Health Indicators</div>
                <div className="flex items-center gap-4">
                  <NetworkHealthIndicator size="sm" />
                  <NetworkHealthIndicator size="md" showLatency={true} />
                  <NetworkHealthIndicator size="lg" showQualityLabel={true} />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                These indicators can be placed throughout your application to provide 
                network status feedback to users.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Ping History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Ping History
          </CardTitle>
          <CardDescription>Recent latency measurements</CardDescription>
        </CardHeader>
        <CardContent>
          {pingHistory.length > 0 ? (
            <div className="h-[200px] w-full">
              <div className="h-full flex items-end gap-1">
                {pingHistory.map((ping, i) => {
                  const height = ping.latency ? Math.min(100, (ping.latency / 10)) : 0;
                  let barColor = "bg-green-500";
                  
                  if (ping.latency === null) {
                    barColor = "bg-red-500";
                  } else if (ping.latency > 600) {
                    barColor = "bg-red-500";
                  } else if (ping.latency > 300) {
                    barColor = "bg-amber-500";
                  } else if (ping.latency > 100) {
                    barColor = "bg-emerald-500";
                  }
                  
                  return (
                    <div 
                      key={i} 
                      className="group relative flex-1 flex flex-col justify-end h-full"
                      title={`${formatLatency(ping.latency)} at ${new Date(ping.time).toLocaleTimeString()}`}
                    >
                      <div 
                        className={`w-full rounded-t-sm ${barColor}`} 
                        style={{ height: `${height}%` }}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-popover text-popover-foreground text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                        {formatLatency(ping.latency)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p>No ping data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
