"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarPlus, Clock, User, MessageCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface ScheduleMessageFormData {
  subject: string
  message: string
  recipient: string
  recipientGroup?: string
  scheduleTime: string
  recurring?: string | null
}

interface ScheduleMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSchedule: (data: ScheduleMessageFormData) => Promise<void>
  recipientGroups?: { id: string; name: string }[]
  trigger?: React.ReactNode
}

export function ScheduleMessageDialog({
  open,
  onOpenChange,
  onSchedule,
  recipientGroups = [],
  trigger,
}: ScheduleMessageDialogProps) {
  const [formData, setFormData] = useState<ScheduleMessageFormData>({
    subject: "",
    message: "",
    recipient: "",
    recipientGroup: "",
    scheduleTime: "",
    recurring: null,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useGroup, setUseGroup] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.subject || !formData.message || !formData.scheduleTime) {
      alert("Please fill all required fields.")
      return
    }
    
    if (!useGroup && !formData.recipient) {
      alert("Please enter a recipient or select a group.")
      return
    }
    
    if (useGroup && !formData.recipientGroup) {
      alert("Please select a recipient group.")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await onSchedule(formData)
      setFormData({
        subject: "",
        message: "",
        recipient: "",
        recipientGroup: "",
        scheduleTime: "",
        recurring: null,
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error scheduling message:", error)
      alert("Failed to schedule message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarPlus className="mr-2 h-6 w-6" /> Schedule a New Message
          </DialogTitle>
          <DialogDescription>
            Compose your message and set a date and time for it to be sent automatically.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Message subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Recipient</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseGroup(!useGroup)}
                  className="text-xs"
                >
                  {useGroup ? "Enter Individual" : "Use Group"}
                </Button>
              </div>
              
              {useGroup ? (
                <Select
                  value={formData.recipientGroup}
                  onValueChange={(value) => handleSelectChange("recipientGroup", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-gray-500" />
            <Input
                      id="recipient"
              placeholder="e.g., +12345678900"
                      value={formData.recipient}
                      onChange={handleChange}
            />
          </div>
                  <p className="text-xs text-muted-foreground">
                    Include country code with + prefix
                  </p>
                </div>
              )}
            </div>
            
          <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-500" /> Message
            </Label>
            <Textarea
                id="message"
              placeholder="Type your message here..."
              rows={4}
                value={formData.message}
                onChange={handleChange}
                required
            />
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
                <Label htmlFor="scheduleTime" className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" /> Schedule Date & Time
            </Label>
            <Input
                  id="scheduleTime"
                  type="datetime-local"
                  value={formData.scheduleTime}
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
              {isSubmitting ? "Scheduling..." : "Schedule Message"}
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
