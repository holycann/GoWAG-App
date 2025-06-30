import React from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConnectSessionCardProps {
  className?: string
  onConnectClick?: () => void
}

export function ConnectSessionCard({ className, onConnectClick }: ConnectSessionCardProps) {
  return (
    <Card className={cn("border-dashed flex items-center justify-center h-full", className)}>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="rounded-full bg-muted p-3 mb-2">
          <QrCode className="h-6 w-6" />
        </div>
        <CardTitle className="text-center mb-1">Connect New Device</CardTitle>
        <CardDescription className="text-center">Scan QR to add WhatsApp session</CardDescription>
        <Button className="mt-4" onClick={onConnectClick}>Connect</Button>
      </CardContent>
    </Card>
  )
} 