import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, XCircle, Battery, Clock, Smartphone, MessageSquare } from "lucide-react"

interface DeviceCardProps {
  name: string
  phoneNumber: string
  status: "connected" | "disconnected" | "connecting"
  battery?: number
  batteryUnknown?: boolean
  messagesPerDay: number
  connectedSince?: string
  lastSeen?: string
  isMainDevice?: boolean
  onReconnect?: () => void
  onDisconnect?: () => void
  onViewDetails?: () => void
}

export function DeviceCard({
  name,
  phoneNumber,
  status,
  battery,
  batteryUnknown = false,
  messagesPerDay,
  connectedSince,
  lastSeen,
  isMainDevice = false,
  onReconnect,
  onDisconnect,
  onViewDetails
}: DeviceCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Connected
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" /> Disconnected
          </Badge>
        )
      case "connecting":
        return (
          <Badge className="bg-yellow-600">
            <AlertTriangle className="h-3 w-3 mr-1" /> Connecting
          </Badge>
        )
    }
  }

  const getBatteryDisplay = () => {
    if (batteryUnknown) {
      return "Unknown"
    }
    if (battery === undefined) {
      return "Unknown"
    }
    return `${battery}%`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">
              {name} {isMainDevice && <Badge className="ml-2">Main</Badge>}
            </CardTitle>
            <CardDescription>{phoneNumber}</CardDescription>
          </div>
          <Smartphone className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
          </div>

          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Battery className="h-3.5 w-3.5 mr-1" /> Battery
            </div>
            <div className="font-medium text-right">{getBatteryDisplay()}</div>

            <div className="flex items-center text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5 mr-1" /> Messages
            </div>
            <div className="font-medium text-right">{messagesPerDay}/day</div>

            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" /> {status === "connected" ? "Connected" : "Last seen"}
            </div>
            <div className="font-medium text-right">
              {status === "connected" ? connectedSince : lastSeen}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        {status === "connected" ? (
          <Button variant="outline" size="sm" className="w-full" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button size="sm" className="w-full" onClick={onReconnect}>
            Reconnect
          </Button>
        )}
        {onViewDetails && (
          <Button variant="ghost" size="sm" onClick={onViewDetails}>
            Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 