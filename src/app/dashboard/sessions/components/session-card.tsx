import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SessionCardProps {
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
  onRestart?: () => void
  onLogout?: () => void
  onReconnect?: () => void
}

export function SessionCard({
  title,
  phoneNumber,
  isConnected,
  data,
  onRestart,
  onLogout,
  onReconnect
}: SessionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {isConnected ? (
            <div className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1 flex items-center dark:bg-green-900/20 dark:text-green-400">
              <CheckCircle className="h-3 w-3 mr-1" /> Connected
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 text-xs rounded-full px-2 py-1 flex items-center dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-3 w-3 mr-1" /> Disconnected
            </div>
          )}
        </div>
        <CardDescription>{phoneNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {isConnected ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Connected Since:</span>
                <span>{data.connectedSince}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Battery:</span>
                <span>{data.battery}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Client:</span>
                <span>{data.client}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Activity:</span>
                <span>{data.lastActivity}</span>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={onRestart}>
                  Restart
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Seen:</span>
                <span>{data.lastSeen}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Disconnection Reason:</span>
                <span>{data.disconnectionReason}</span>
              </div>
              
              <div className="mt-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 flex items-start">
                <AlertCircle className="h-4 w-4 mt-0.5 mr-2 shrink-0" />
                <div>
                  <div className="font-medium">Disconnected</div>
                  <div className="text-sm">
                    This session has been disconnected. Please reconnect to continue receiving messages.
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={onReconnect}>
                Reconnect
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 