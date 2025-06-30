"use client"

import React from "react"
import { SessionsHeader, SessionsList } from "./components"

// Sample session data
const activeSessions = [
  {
    id: "1",
    title: "Primary WhatsApp",
    phoneNumber: "+62 812-3456-7890",
    isConnected: true,
    data: {
      connectedSince: "2 days ago",
      battery: "85%",
      client: "WhatsApp Web (Chrome)",
      lastActivity: "2 minutes ago",
    }
  },
  {
    id: "2",
    title: "Support WhatsApp",
    phoneNumber: "+62 877-1234-5678",
    isConnected: true,
    data: {
      connectedSince: "5 hours ago",
      battery: "72%",
      client: "WhatsApp Web (Firefox)",
      lastActivity: "10 minutes ago",
    }
  }
]

const disconnectedSessions = [
  {
    id: "3",
    title: "Marketing WhatsApp",
    phoneNumber: "+62 856-7890-1234",
    isConnected: false,
    data: {
      lastSeen: "1 day ago",
      disconnectionReason: "Phone offline"
    }
  }
]

export default function SessionsPage() {
  // Function to handle session actions
  const handleRestartSession = (id: string) => {
    console.log(`Restarting session ${id}`)
  }
  
  const handleLogoutSession = (id: string) => {
    console.log(`Logging out session ${id}`)
  }
  
  const handleReconnectSession = (id: string) => {
    console.log(`Reconnecting session ${id}`)
  }
  
  const handleConnectNew = () => {
    console.log("Connecting new device")
  }

  return (
    <div className="container mx-auto p-6">
      <SessionsHeader 
        title="WhatsApp Sessions" 
        description="Kelola dan pantau sesi WhatsApp yang terhubung" 
        onConnectClick={handleConnectNew} 
      />
      
      <SessionsList 
        activeSessions={activeSessions}
        disconnectedSessions={disconnectedSessions}
        onRestartSession={handleRestartSession}
        onLogoutSession={handleLogoutSession}
        onReconnectSession={handleReconnectSession}
        onConnectNew={handleConnectNew}
      />
    </div>
  )
} 