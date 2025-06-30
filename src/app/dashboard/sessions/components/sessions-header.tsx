import React from "react"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

interface SessionsHeaderProps {
  title: string
  description: string
  onConnectClick?: () => void
}

export function SessionsHeader({ title, description, onConnectClick }: SessionsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button size="lg" onClick={onConnectClick}>
        <QrCode className="mr-2 h-5 w-5" />
        Connect New Device
      </Button>
    </div>
  )
} 