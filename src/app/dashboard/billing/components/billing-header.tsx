import React from "react"
import { Button } from "@/components/ui/button"
import { CircleDollarSign } from "lucide-react"

interface BillingHeaderProps {
  title: string
  description: string
  onUpgrade: () => void
}

export function BillingHeader({ title, description, onUpgrade }: BillingHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onUpgrade}>
        <CircleDollarSign className="mr-2 h-4 w-4" /> Upgrade Plan
      </Button>
    </div>
  )
} 