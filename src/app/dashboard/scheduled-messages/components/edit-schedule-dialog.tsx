"use client"

import React, { useState, useEffect } from "react"

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
import { Edit3, Clock, MessageCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScheduledMessage } from "./scheduled-message-list"

interface EditScheduleDialogProps {
  message: ScheduledMessage | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedMessage: ScheduledMessage) => void
  recipientGroups?: { id: string; name: string }[]
}

export function EditScheduleDialog({
  message,
  open,
  onOpenChange,
  onSave,
  recipientGroups = [],
}: EditScheduleDialogProps) {
  const [formData, setFormData] = useState<ScheduledMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (message) {
      setFormData({ ...message })
    }
  }, [message, open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return
    
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSelectChange = (field: string, value: string | null) => {
    if (!formData) return
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData) return
    
    // Simple validation
    if (!formData.subject || !formData.message || !formData.scheduledFor) {
      alert("Please fill all required fields.")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      onSave(formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating message:", error)
      alert("Failed to update message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit3 className="mr-2 h-6 w-6" /> Edit Scheduled Message
          </DialogTitle>
          <DialogDescription>
            Modify the details of your scheduled message.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
            <Input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
            />
          </div>
            
          <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-500" /> Message
            </Label>
            <Textarea
                id="message"
              rows={4}
                value={formData.message}
                onChange={handleChange}
                required
            />
          </div>
            
            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="text-sm bg-muted p-2 rounded-md">
                {formData.recipients.join(", ")}
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.recipientCount} recipients
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
                <Label htmlFor="scheduledFor" className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" /> Schedule Date & Time
            </Label>
            <Input
                  id="scheduledFor"
              type="datetime-local"
                  value={formatDateForInput(formData.scheduledFor)}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recurring">Recurring</Label>
                <Select
                  value={formData.recurring || "none"}
                  onValueChange={(value) => 
                    handleSelectChange("recurring", value === "none" ? null : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not recurring" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not recurring</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
        </div>
        <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : null}
              {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to format date for datetime-local input
function formatDateForInput(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    
    // Format to YYYY-MM-DDTHH:mm
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
  } catch (e) {
    return ""
  }
}
