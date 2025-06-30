import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  title: string
  description: string
  time: string
  priority: "high" | "medium" | "low"
  icon: LucideIcon
}

interface AlertsCardProps {
  alerts: Alert[]
  className?: string
}

export function AlertsCard({ alerts, className }: AlertsCardProps) {
  return (
    <Card className={cn("overflow-hidden border border-border/50 hover:border-border transition-all", className)}>
      <CardHeader className="bg-muted/20">
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          System notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/10 transition-colors">
              <div className={cn(
                "mt-0.5 rounded-full p-1.5",
                alert.priority === 'high' 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                  : alert.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
              )}>
                <alert.icon className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{alert.title}</div>
                <div className="text-xs text-muted-foreground">{alert.description}</div>
                <div className="text-xs mt-1 text-muted-foreground">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/50 bg-muted/5 p-2">
        <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/5">
          View All Alerts
        </Button>
      </CardFooter>
    </Card>
  )
} 