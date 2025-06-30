import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionCard } from "./session-card"
import { ConnectSessionCard } from "./connect-session-card"

interface Session {
  id: string
  title: string
  phoneNumber: string
  isConnected: boolean
  data: {
    connectedSince?: string
    battery?: string
    client?: string
    lastActivity?: string
    lastSeen?: string
    disconnectionReason?: string
  }
}

interface SessionsListProps {
  activeSessions: Session[]
  disconnectedSessions: Session[]
  onRestartSession?: (id: string) => void
  onLogoutSession?: (id: string) => void
  onReconnectSession?: (id: string) => void
  onConnectNew?: () => void
}

export function SessionsList({
  activeSessions,
  disconnectedSessions,
  onRestartSession,
  onLogoutSession,
  onReconnectSession,
  onConnectNew
}: SessionsListProps) {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-4">
        <TabsTrigger value="active">Active Sessions</TabsTrigger>
        <TabsTrigger value="disconnected">Disconnected</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSessions.map((session) => (
            <SessionCard
              key={session.id}
              title={session.title}
              phoneNumber={session.phoneNumber}
              isConnected={session.isConnected}
              data={session.data}
              onRestart={() => onRestartSession?.(session.id)}
              onLogout={() => onLogoutSession?.(session.id)}
            />
          ))}
          
          <ConnectSessionCard onConnectClick={onConnectNew} />
        </div>
      </TabsContent>
      
      <TabsContent value="disconnected">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {disconnectedSessions.map((session) => (
            <SessionCard
              key={session.id}
              title={session.title}
              phoneNumber={session.phoneNumber}
              isConnected={session.isConnected}
              data={session.data}
              onReconnect={() => onReconnectSession?.(session.id)}
            />
          ))}
          
          {disconnectedSessions.length === 0 && (
            <div className="col-span-3 text-center text-muted-foreground py-8">
              No disconnected sessions found.
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
} 