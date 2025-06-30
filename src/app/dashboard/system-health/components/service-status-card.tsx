import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface ServiceStatusCardProps {
  name: string
  status: "operational" | "degraded" | "outage"
  description: string
  icon: LucideIcon
  uptime: string
  lastIncident: string
  onViewDetails?: () => void
}

export function ServiceStatusCard({ 
  name, 
  status, 
  description, 
  icon: Icon, 
  uptime, 
  lastIncident,
  onViewDetails 
}: ServiceStatusCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          {status === "operational" && (
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" /> Operational
            </Badge>
          )}
          {status === "degraded" && (
            <Badge className="bg-yellow-600">
              <AlertTriangle className="h-3 w-3 mr-1" /> Degraded
            </Badge>
          )}
          {status === "outage" && (
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" /> Outage
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-muted-foreground">Uptime</div>
          <div className="font-medium text-right">{uptime}</div>
          <div className="text-muted-foreground">Last incident</div>
          <div className="font-medium text-right">{lastIncident}</div>
        </div>
      </CardContent>
      {onViewDetails && (
        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className="w-full" onClick={onViewDetails}>
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 