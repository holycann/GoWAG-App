import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface CampaignsHeaderProps {
  title: string
  description: string
  onCreateCampaign: () => void
}

export function CampaignsHeader({
  title,
  description,
  onCreateCampaign
}: CampaignsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <Button onClick={onCreateCampaign}>
        <Plus className="mr-2 h-4 w-4" /> New Campaign
      </Button>
    </div>
  )
} 