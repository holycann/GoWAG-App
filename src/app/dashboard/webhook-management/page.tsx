"use client"

import React, { useState } from "react"
import { 
  WebhookHeader, 
  WebhookTabs 
} from "./components"

// Sample webhooks data
const sampleWebhooks = [
  {
    id: "1",
    name: "Primary Webhook",
    url: "https://api.example.com/webhooks/whatsapp",
    events: ["message:received", "message:sent", "session:status"],
    status: 'active' as const
  },
  {
    id: "2",
    name: "Backup Webhook",
    url: "https://backup.example.com/hooks/whatsapp-events",
    events: ["message:received", "session:status"],
    status: 'active' as const
  },
  {
    id: "3",
    name: "Development Webhook",
    url: "https://dev.example.com/webhooks/whatsapp",
    events: ["all"],
    status: 'paused' as const
  }
]

// Sample logs data
const sampleLogs = [
  {
    id: "log1",
    timestamp: "2023-09-15 14:32:45",
    event: "message:received",
    webhook: "Primary Webhook",
    status: 'success' as const,
    responseCode: 200,
    responseTime: 145
  },
  {
    id: "log2",
    timestamp: "2023-09-15 14:30:12",
    event: "message:sent",
    webhook: "Primary Webhook",
    status: 'success' as const,
    responseCode: 200,
    responseTime: 132
  },
  {
    id: "log3",
    timestamp: "2023-09-15 14:28:55",
    event: "session:status",
    webhook: "Backup Webhook",
    status: 'failed' as const,
    responseCode: 500
  },
  {
    id: "log4",
    timestamp: "2023-09-15 14:25:18",
    event: "message:received",
    webhook: "Development Webhook",
    status: 'pending' as const
  }
]

export default function WebhookManagementPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null)

  // Functions to handle webhooks
  const handleAddWebhook = () => {
    setSelectedWebhook(null)
    setShowForm(true)
  }

  const handleEditWebhook = (id: string) => {
    const webhook = sampleWebhooks.find(wh => wh.id === id)
    setSelectedWebhook(webhook)
    setShowForm(true)
  }

  const handleEnableDisableWebhook = (id: string, status: 'active' | 'paused' | 'disabled') => {
    console.log(`Toggling webhook ${id} from ${status} to ${status === 'active' ? 'disabled' : 'active'}`)
  }

  const handleSaveWebhook = (data: any) => {
    console.log("Saving webhook:", data)
    setShowForm(false)
  }

  const handleCancelWebhook = () => {
    setShowForm(false)
  }

  // Functions to handle logs
  const handleRefreshLogs = () => {
    console.log("Refreshing logs")
  }

  const handleFilterLogs = (status: string) => {
    console.log(`Filtering logs by status: ${status}`)
  }

  const handleViewLogDetails = (id: string) => {
    console.log(`Viewing log details for ${id}`)
  }

  const handleRetryDelivery = (id: string) => {
    console.log(`Retrying delivery for ${id}`)
  }

  // Security and testing functions
  const handleRegenerateSecret = () => {
    console.log("Regenerating webhook secret")
  }

  const handleTestWebhook = (data: any) => {
    console.log("Testing webhook with data:", data)
  }

  return (
    <div className="container mx-auto p-6">
      <WebhookHeader
        title="Webhook Management"
        description="Konfigurasi endpoint webhook dan notifikasi"
        onAddWebhook={handleAddWebhook}
      />
      
      <WebhookTabs
        webhooks={sampleWebhooks}
        logs={sampleLogs}
        selectedWebhook={selectedWebhook}
        showForm={showForm}
        onEditWebhook={handleEditWebhook}
        onEnableDisableWebhook={handleEnableDisableWebhook}
        onSaveWebhook={handleSaveWebhook}
        onCancelWebhook={handleCancelWebhook}
        onRefreshLogs={handleRefreshLogs}
        onFilterLogs={handleFilterLogs}
        onViewLogDetails={handleViewLogDetails}
        onRetryDelivery={handleRetryDelivery}
        onRegenerateSecret={handleRegenerateSecret}
        onTestWebhook={handleTestWebhook}
      />
    </div>
  )
} 