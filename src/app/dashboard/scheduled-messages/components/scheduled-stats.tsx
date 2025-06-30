"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Timer, CheckCircle, PauseCircle } from "lucide-react";
import { ScheduledMessage } from "./scheduled-message-list";

interface ScheduledStatsProps {
  activeCount: number;
  pausedCount: number;
  sentCount: number;
  totalCount: number;
  upcomingMessages: ScheduledMessage[];
}

export function ScheduledStats({ 
  activeCount, 
  pausedCount, 
  sentCount, 
  totalCount,
  upcomingMessages 
}: ScheduledStatsProps) {
  // Get the next delivery time
  const getNextDeliveryTime = () => {
    if (upcomingMessages.length === 0) {
      return { date: "No scheduled", time: "messages" };
    }
    
    const nextDate = new Date(upcomingMessages[0].scheduledFor);
    return {
      date: nextDate.toLocaleDateString(),
      time: nextDate.toLocaleTimeString()
    };
  };
  
  const nextDelivery = getNextDeliveryTime();
  const recurringCount = upcomingMessages.filter(msg => msg.recurring).length;

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-primary" /> Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Messages pending delivery
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="mr-2 h-4 w-4 text-primary" /> Next Delivery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {nextDelivery.date}
          </div>
          <p className="text-xs text-muted-foreground">
            {nextDelivery.time}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <PauseCircle className="mr-2 h-4 w-4 text-primary" /> Paused
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {pausedCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Temporarily suspended
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {sentCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Previously delivered
          </p>
        </CardContent>
      </Card>
    </>
  );
} 