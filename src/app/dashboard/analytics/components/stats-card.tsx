import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: "up" | "down" | "neutral"
}

export function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="bg-primary/10 p-2 rounded-full">{icon}</span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-sm">
          {trend === "up" && (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
          )}
          {trend === "down" && (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={
            trend === "up" ? "text-green-500" :
            trend === "down" ? "text-red-500" :
            "text-muted-foreground"
          }>
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  )
} 