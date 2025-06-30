import React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, FileText } from "lucide-react"

interface AnalyticsHeaderProps {
  title: string
  description: string
  period: string
  onPeriodChange: (period: string) => void
  onRefresh: () => void
  onExport: () => void
}

export function AnalyticsHeader({
  title,
  description,
  period,
  onPeriodChange,
  onRefresh,
  onExport
}: AnalyticsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Last 24 Hours</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
        <Button onClick={onExport}>
          <FileText className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>
    </div>
  )
} 