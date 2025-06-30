"use client"

import React from "react"
import {
  Globe,
  Database,
  Server,
  HardDrive,
  Cpu,
} from "lucide-react"
import {
  SystemHealthHeader,
  SystemStatusCards,
  SystemHealthTabs
} from "./components"

// Sample system statuses
const systemStatuses = [
  {
    name: "WhatsApp API",
    status: "operational",
    details: "All services running"
  },
  {
    name: "Database",
    status: "operational",
    details: "Response time: 45ms"
  },
  {
    name: "Webhook Service",
    status: "degraded",
    details: "Latency issues detected"
  },
  {
    name: "Authentication",
    status: "operational",
    details: "No issues detected"
  }
] as const;

// Sample services data
const services = [
  {
    name: "WhatsApp API",
    status: "operational" as const,
    description: "Core WhatsApp message sending and receiving",
    icon: Globe,
    uptime: "99.98%",
    lastIncident: "21 days ago"
  },
  {
    name: "Database",
    status: "operational" as const,
    description: "Message and user data storage",
    icon: Database,
    uptime: "99.99%",
    lastIncident: "47 days ago"
  },
  {
    name: "Authentication",
    status: "operational" as const,
    description: "User and session authentication",
    icon: Server,
    uptime: "100%",
    lastIncident: "Never"
  },
  {
    name: "File Storage",
    status: "operational" as const,
    description: "Media and document storage",
    icon: HardDrive,
    uptime: "99.97%",
    lastIncident: "12 days ago"
  },
  {
    name: "Webhook Service",
    status: "degraded" as const,
    description: "Webhook delivery system",
    icon: Globe,
    uptime: "98.52%",
    lastIncident: "2 hours ago"
  },
  {
    name: "Auto-Reply Engine",
    status: "operational" as const,
    description: "Automated message responses",
    icon: Cpu,
    uptime: "99.95%",
    lastIncident: "5 days ago"
  },
];

// Sample incidents data
const incidents = [
  {
    id: "incident-1",
    title: "Webhook Service Degraded Performance",
    description: "Increased latency detected in webhook delivery. Our team is investigating the issue. Webhook events are being queued and will be delivered once the system is restored.",
    startedAt: "2 hours ago",
    severity: "warning" as const
  }
];

// Sample device data
const devices = [
  {
    id: "device-1",
    name: "Primary WhatsApp",
    phoneNumber: "+62 812-3456-7890",
    status: "connected" as const,
    battery: 87,
    messagesPerDay: 852,
    connectedSince: "5 days ago",
    isMainDevice: true
  },
  {
    id: "device-2",
    name: "Support WhatsApp",
    phoneNumber: "+62 877-1234-5678",
    status: "connected" as const,
    battery: 65,
    messagesPerDay: 341,
    connectedSince: "2 days ago"
  },
  {
    id: "device-3",
    name: "Marketing WhatsApp",
    phoneNumber: "+62 856-7890-1234",
    status: "disconnected" as const,
    batteryUnknown: true,
    messagesPerDay: 125,
    lastSeen: "4 hours ago"
  }
];

// Sample resource data
const cpuData = [
  { time: "1m", usage: 12 },
  { time: "5m", usage: 18 },
  { time: "10m", usage: 25 },
  { time: "15m", usage: 15 },
  { time: "20m", usage: 22 },
  { time: "25m", usage: 30 },
  { time: "30m", usage: 28 },
];

const memoryData = [
  { time: "1m", usage: 35 },
  { time: "5m", usage: 38 },
  { time: "10m", usage: 42 },
  { time: "15m", usage: 40 },
  { time: "20m", usage: 45 },
  { time: "25m", usage: 48 },
  { time: "30m", usage: 52 },
];

const diskData = [
  { time: "1m", usage: 67 },
  { time: "5m", usage: 67 },
  { time: "10m", usage: 68 },
  { time: "15m", usage: 68 },
  { time: "20m", usage: 68 },
  { time: "25m", usage: 69 },
  { time: "30m", usage: 69 },
];

const networkData = [
  { time: "1m", inbound: 250, outbound: 120 },
  { time: "5m", inbound: 380, outbound: 230 },
  { time: "10m", inbound: 420, outbound: 275 },
  { time: "15m", inbound: 520, outbound: 320 },
  { time: "20m", inbound: 480, outbound: 290 },
  { time: "25m", inbound: 410, outbound: 210 },
  { time: "30m", inbound: 390, outbound: 180 },
];

// Sample logs data
const logs = [
  {
    timestamp: "2023-06-28 14:23:15",
    level: "ERROR",
    message: "Failed to deliver webhook: Endpoint returned 503 Service Unavailable"
  },
  {
    timestamp: "2023-06-28 14:22:48",
    level: "WARN",
    message: "Webhook delivery delayed: Endpoint response time > 5000ms"
  },
  {
    timestamp: "2023-06-28 14:20:12",
    level: "INFO",
    message: "WhatsApp session 'Marketing' disconnected"
  },
  {
    timestamp: "2023-06-28 14:15:45",
    level: "INFO",
    message: "System backup completed successfully"
  },
  {
    timestamp: "2023-06-28 14:10:33",
    level: "DEBUG",
    message: "Rate limit applied to IP 203.0.113.42"
  }
];

export default function SystemHealthPage() {
  const handleRefresh = () => {
    console.log("Refreshing system status...")
  }

  const handleViewServiceDetails = (serviceId: string) => {
    console.log(`Viewing details for service: ${serviceId}`)
  }

  const handleReconnectDevice = (deviceId: string) => {
    console.log(`Reconnecting device: ${deviceId}`)
  }

  const handleDisconnectDevice = (deviceId: string) => {
    console.log(`Disconnecting device: ${deviceId}`)
  }

  const handleViewDeviceDetails = (deviceId: string) => {
    console.log(`Viewing details for device: ${deviceId}`)
  }

  const handleViewIncidentDetails = (incidentId: string) => {
    console.log(`Viewing details for incident: ${incidentId}`)
  }

  // Aggregate resource data
  const resourceData = {
    cpuData,
    memoryData,
    diskData,
    networkData
  }

  return (
    <div className="container mx-auto p-6">
      <SystemHealthHeader 
        title="System Health" 
        description="Status koneksi dan kondisi sistem"
        onRefresh={handleRefresh}
      />

      <SystemStatusCards statuses={systemStatuses} />

      <SystemHealthTabs 
        services={services}
        devices={devices}
        incidents={incidents}
        resourceData={resourceData}
        logs={logs}
        onViewServiceDetails={handleViewServiceDetails}
        onReconnectDevice={handleReconnectDevice}
        onDisconnectDevice={handleDisconnectDevice}
        onViewDeviceDetails={handleViewDeviceDetails}
        onViewIncidentDetails={handleViewIncidentDetails}
      />
    </div>
  )
} 