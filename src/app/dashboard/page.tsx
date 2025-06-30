"use client"

import React from "react"
import { 
  MessageSquare, 
  ArrowUpRight, 
  Ban, 
  CheckCircle2, 
  Clock, 
  BellRing,
  Users,
  Activity,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Phone,
  BarChart3,
  Send,
  Calendar,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  QRCard,
  StatCard,
  DashboardHeader,
  QuickActionsGrid,
  AlertsCard,
  ActivityCard
} from "./components"

// Sample data for the charts/stats
const activityData = [
  { name: "Mon", messages: 40 },
  { name: "Tue", messages: 30 },
  { name: "Wed", messages: 45 },
  { name: "Thu", messages: 60 },
  { name: "Fri", messages: 50 },
  { name: "Sat", messages: 25 },
  { name: "Sun", messages: 15 },
]

const alerts = [
  { 
    title: "Support WhatsApp Disconnected",
    description: "Device has been offline for 3 hours",
    time: "3 hours ago",
    priority: "high",
    icon: AlertCircle
  },
  { 
    title: "High message volume detected",
    description: "Messages increased by 43% in the last hour",
    time: "1 hour ago",
    priority: "medium",
    icon: Activity
  },
  { 
    title: "Webhook endpoint unresponsive",
    description: "Multiple failed delivery attempts",
    time: "30 min ago",
    priority: "medium",
    icon: Ban
  }
]

const quickActions = [
  {
    label: "Send Message",
    href: "/dashboard/send-message",
    icon: Send,
  },
  {
    label: "Schedule Message",
    href: "/dashboard/scheduled-messages",
    icon: Calendar,
  },
  {
    label: "Connect Device",
    href: "/dashboard/connect-device",
    icon: Phone,
  },
  {
    label: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Webhooks",
    href: "/dashboard/webhook-management",
    icon: ArrowUpRight,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Dashboard"
        description="Welcome to your WhatsApp Gateway control center"
        buttonText="Connect New Device"
        buttonHref="/dashboard/connect-device"
      />

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Sessions" 
          value="3/5" 
          description="Connected WhatsApp devices" 
          icon={Phone} 
          trend="up"
          trendValue="1"
          className="border-l-4 border-primary hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all"
        />
        <StatCard 
          title="Messages Today" 
          value="1,234" 
          description="Total messages sent & received" 
          icon={MessageSquare} 
          trend="up"
          trendValue="12%"
          className="border-l-4 border-secondary hover:shadow-lg hover:shadow-secondary/5 dark:hover:shadow-secondary/10 transition-all"
        />
        <StatCard 
          title="Active Contacts" 
          value="2,845" 
          description="Contacts with recent activity" 
          icon={Users} 
          trend="up"
          trendValue="8%"
          className="border-l-4 border-accent hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-accent/10 transition-all"
        />
        <StatCard 
          title="Scheduled Messages" 
          value="24" 
          description="Pending scheduled messages" 
          icon={Clock} 
          trend="down"
          trendValue="3"
          className="border-l-4 border-muted hover:shadow-lg hover:shadow-muted/5 dark:hover:shadow-muted/10 transition-all"
        />
      </div>

      {/* Quick Actions and QR Card */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionsGrid actions={quickActions} />
        <QRCard className="hover:shadow-lg transition-all border border-border/50 hover:border-border" />
      </div>

      {/* Activity and Alerts */}
      <div className="grid gap-6 md:grid-cols-3">
        <ActivityCard 
          data={activityData} 
          totalWeek={265} 
          weeklyAverage={38} 
        />
        <AlertsCard alerts={alerts} />
      </div>
    </div>
  )
}
