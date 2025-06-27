"use client"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Clock, User, MessageCircle } from "lucide-react"

interface ScheduledMessage {
  id: string
  recipient: string
  messageSnippet: string // Or full message if needed for editing
  scheduledTime: string // ISO format for datetime-local e.g., "2025-06-25T10:30"
  status: string
}

interface EditScheduleDialogProps {
  messageData: ScheduledMessage | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: ScheduledMessage) => void // Placeholder
}

export function EditScheduleDialog({ messageData, isOpen, onOpenChange, onSave }: EditScheduleDialogProps) {
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (messageData) {
      setRecipient(messageData.recipient)
      setMessage(messageData.messageSnippet) // Assuming this is the full message for editing
      // Convert display time to datetime-local format if necessary
      // For simplicity, assuming messageData.scheduledTime is already in a compatible format or needs conversion
      // This is a common point of complexity with date/time formats.
      // Example: if messageData.scheduledTime is "2025-06-23 10:00 AM", it needs conversion.
      // For now, let's assume it's somewhat compatible or we use it as is.
      // A robust solution would use a date library like date-fns to parse and format.
      try {
        const date = new Date(messageData.scheduledTime) // Attempt to parse
        if (!isNaN(date.getTime())) {
          // Format to YYYY-MM-DDTHH:mm
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, "0")
          const day = date.getDate().toString().padStart(2, "0")
          const hours = date.getHours().toString().padStart(2, "0")
          const minutes = date.getMinutes().toString().padStart(2, "0")
          setScheduleTime(`${year}-${month}-${day}T${hours}:${minutes}`)
        } else {
          setScheduleTime(messageData.scheduledTime) // Fallback if parsing fails
        }
      } catch (e) {
        setScheduleTime(messageData.scheduledTime) // Fallback
      }
    }
  }, [messageData])

  const handleSubmit = async () => {
    if (!recipient || !message || !scheduleTime || !messageData) {
      alert("Please fill all fields.") // Simple validation
      return
    }
    setIsSaving(true)
    // --- Placeholder for actual save logic ---
    const updatedMessage = { ...messageData, recipient, messageSnippet: message, scheduledTime }
    console.log("Saving edited message:", updatedMessage)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave?.(updatedMessage as ScheduledMessage) // Callback if provided
    // --- End of placeholder ---
    setIsSaving(false)
    onOpenChange(false) // Close dialog on success
  }

  if (!messageData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-brandDarkBlue">
            <Edit3 className="mr-2 h-6 w-6" /> Edit Scheduled Message
          </DialogTitle>
          <DialogDescription>Modify the details of your scheduled message.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-recipient" className="text-gray-700 flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" /> Recipient Number
            </Label>
            <Input
              id="edit-recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-message" className="text-gray-700 flex items-center">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-500" /> Message
            </Label>
            <Textarea
              id="edit-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-schedule-time" className="text-gray-700 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" /> Schedule Date & Time
            </Label>
            <Input
              id="edit-schedule-time"
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="hover:bg-slate-100">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-brandDarkBlue text-white hover:bg-opacity-90"
            disabled={isSaving}
          >
            {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : null}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
