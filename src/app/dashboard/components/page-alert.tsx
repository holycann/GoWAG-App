"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageAlertProps {
  type: "success" | "error"
  title: string
  message: string
  onClose?: () => void
}

export function PageAlert({ type, title, message, onClose }: PageAlertProps) {
  if (!message) return null

  return (
    <Alert
      variant={type === "success" ? "default" : "destructive"}
      className={`fixed top-20 right-5 z-50 w-auto max-w-sm animate-fadeIn shadow-lg ${
        type === "success" ? "bg-green-50 border-green-300 text-green-700" : "bg-red-50 border-red-300 text-red-700"
      }`}
    >
      {type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
      <div className="flex-grow">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onClose && (
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-auto -mr-1 -mt-1 h-7 w-7">
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  )
}
