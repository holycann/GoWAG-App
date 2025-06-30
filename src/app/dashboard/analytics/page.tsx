"use client"

import React, { useState } from "react"
import { MessageSquare, Percent, Users, Clock } from "lucide-react"
import {
  AnalyticsHeader,
  StatsCard,
  AnalyticsTabs
} from "./components"

// Sample data for charts and metrics
const messageData = [
  { name: "Jun 1", sent: 245, delivered: 235, read: 180, responses: 65 },
  { name: "Jun 8", sent: 290, delivered: 280, read: 220, responses: 85 },
  { name: "Jun 15", sent: 310, delivered: 290, read: 240, responses: 95 },
  { name: "Jun 22", sent: 380, delivered: 350, read: 290, responses: 120 },
  { name: "Jun 29", sent: 400, delivered: 380, read: 310, responses: 140 },
  { name: "Jul 6", sent: 450, delivered: 425, read: 350, responses: 160 },
]

const userActivityData = [
  { name: "Mon", active: 32, new: 5 },
  { name: "Tue", active: 38, new: 3 },
  { name: "Wed", active: 35, new: 4 },
  { name: "Thu", active: 42, new: 6 },
  { name: "Fri", active: 48, new: 8 },
  { name: "Sat", active: 36, new: 5 },
  { name: "Sun", active: 29, new: 2 },
]

const messageSentByHourData = [
  { hour: "00:00", count: 18 },
  { hour: "02:00", count: 12 },
  { hour: "04:00", count: 8 },
  { hour: "06:00", count: 15 },
  { hour: "08:00", count: 45 },
  { hour: "10:00", count: 78 },
  { hour: "12:00", count: 95 },
  { hour: "14:00", count: 120 },
  { hour: "16:00", count: 85 },
  { hour: "18:00", count: 65 },
  { hour: "20:00", count: 42 },
  { hour: "22:00", count: 28 },
]

const messageTypeData = [
  { name: "Text", value: 65 },
  { name: "Image", value: 15 },
  { name: "Video", value: 8 },
  { name: "Document", value: 10 },
  { name: "Audio", value: 2 },
]

const deliveryStatusData = [
  { name: "Delivered", value: 85 },
  { name: "Failed", value: 5 },
  { name: "Pending", value: 10 },
]

const performanceMetrics = [
  {
    title: "API Response Time",
    value: "125ms",
    change: "-15ms from last period",
    trend: "up"
  },
  {
    title: "Error Rate",
    value: "0.8%",
    change: "-0.3% from last period",
    trend: "up"
  },
  {
    title: "CPU Usage",
    value: "42%",
    change: "+5% from last period",
    trend: "down"
  },
  {
    title: "Memory Usage",
    value: "3.2GB",
    change: "+0.4GB from last period",
    trend: "down"
  }
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7days")

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod)
    console.log(`Period changed to: ${newPeriod}`)
  }

  const handleRefresh = () => {
    console.log("Refreshing analytics data...")
  }

  const handleExport = () => {
    console.log("Exporting analytics report...")
  }

  return (
    <div className="container mx-auto p-6">
      <AnalyticsHeader
        title="Analytics & Reports"
        description="Analyze messaging performance and generate reports"
        period={period}
        onPeriodChange={handlePeriodChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Messages"
          value="2,450"
          description="+14% from last period"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
          trend="up"
        />
        <StatsCard
          title="Delivery Rate"
          value="94.6%"
          description="+2.3% from last period"
          icon={<Percent className="h-4 w-4 text-primary" />}
          trend="up"
        />
        <StatsCard
          title="Active Users"
          value="342"
          description="-5% from last period"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend="down"
        />
        <StatsCard
          title="Avg. Response Time"
          value="3.2 min"
          description="-12% from last period"
          icon={<Clock className="h-4 w-4 text-primary" />}
          trend="up"
        />
      </div>

      <AnalyticsTabs
        messageData={messageData}
        messageTypeData={messageTypeData}
        deliveryStatusData={deliveryStatusData}
        hourlyData={messageSentByHourData}
        userActivityData={userActivityData}
        performanceMetrics={performanceMetrics}
      />
    </div>
  )
} 