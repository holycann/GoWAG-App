import React from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface WebhookHeaderProps {
  title: string
  description: string
  onAddWebhook?: () => void
}

export function WebhookHeader({ title, description, onAddWebhook }: WebhookHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onAddWebhook}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Webhook
      </Button>
    </div>
  )
} 