import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, ChevronDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
}

export function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium text-muted-foreground mb-1">{title}</div>
        <div className="text-xl font-bold">{value}</div>
        <div className="flex items-center mt-1 text-xs">
          {trend === "up" && (
            <ChevronUp className="mr-1 h-3 w-3 text-green-500" />
          )}
          {trend === "down" && (
            <ChevronDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={
            trend === "up" ? "text-green-500" :
            trend === "down" ? "text-red-500" :
            "text-muted-foreground"
          }>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
} 