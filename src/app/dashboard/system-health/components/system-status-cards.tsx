import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface SystemStatus {
  name: string
  status: "operational" | "degraded" | "outage"
  details: string
}

interface SystemStatusCardsProps {
  statuses: SystemStatus[]
}

export function SystemStatusCards({ statuses }: SystemStatusCardsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
      case "degraded":
        return <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
      case "outage":
        return <XCircle className="h-8 w-8 text-red-500 mr-3" />
      default:
        return <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded Performance"
      case "outage":
        return "Service Outage"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statuses.map((item, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {getStatusIcon(item.status)}
              <div>
                <div className="font-medium">{getStatusText(item.status)}</div>
                <div className="text-sm text-muted-foreground">
                  {item.details}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 