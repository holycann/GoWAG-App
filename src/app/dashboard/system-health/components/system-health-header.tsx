import React from "react"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface SystemHealthHeaderProps {
  title: string
  description: string
  onRefresh: () => void
}

export function SystemHealthHeader({ title, description, onRefresh }: SystemHealthHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onRefresh}>
        <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Status
      </Button>
    </div>
  )
} 