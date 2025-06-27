"use client"
import { useState } from "react"
import type React from "react"

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
// You might need a date picker component. shadcn/ui has one.
// For simplicity, using text input for date/time.
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"

interface ScheduleMessageDialogProps {
  triggerButton?: React.ReactNode
  onSchedule?: (data: { recipient: string; message: string; scheduleTime: string }) => void // Placeholder
}

export function ScheduleMessageDialog({ triggerButton, onSchedule }: ScheduleMessageDialogProps) {
  const [open, setOpen] = useState(false)
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const [scheduleTime, setScheduleTime] = useState("") // e.g., "2025-06-25T10:30"
  const [isScheduling, setIsScheduling] = useState(false)

  const handleSubmit = async () => {
    if (!recipient || !message || !scheduleTime) {
      alert("Please fill all fields.") // Simple validation
      return
    }
    setIsScheduling(true)
    // --- Placeholder for actual scheduling logic ---
    console.log("Scheduling message:", { recipient, message, scheduleTime })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSchedule?.({ recipient, message, scheduleTime }) // Callback if provided
    // --- End of placeholder ---
    setIsScheduling(false)
    setOpen(false) // Close dialog on success
    // Reset form
    setRecipient("")
    setMessage("")
    setScheduleTime("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="bg-brandDarkBlue text-white hover:bg-opacity-90 group">
            <CalendarPlus className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            Schedule New Message
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-brandDarkBlue">
            <CalendarPlus className="mr-2 h-6 w-6" /> Schedule a New Message
          </DialogTitle>
          <DialogDescription>
            Compose your message and set a date and time for it to be sent automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-recipient" className="text-gray-700 flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" /> Recipient Number
            </Label>
            <Input
              id="schedule-recipient"
              placeholder="e.g., +12345678900"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-message" className="text-gray-700 flex items-center">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-500" /> Message
            </Label>
            <Textarea
              id="schedule-message"
              placeholder="Type your message here..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-time" className="text-gray-700 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" /> Schedule Date & Time
            </Label>
            <Input
              id="schedule-time"
              type="datetime-local" // Basic HTML5 date-time picker
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
            {/* Example with shadcn Calendar (more complex setup needed)
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {scheduleTime ? format(new Date(scheduleTime), "PPP HH:mm") : <span>Pick a date & time</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={scheduleTime ? new Date(scheduleTime) : undefined} onSelect={(date) => setScheduleTime(date?.toISOString() || "")} initialFocus />
                <Input type="time" className="mt-2" onChange={(e) => { ... }} />
              </PopoverContent>
            </Popover>
            */}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="hover:bg-slate-100">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-brandDarkBlue text-white hover:bg-opacity-90"
            disabled={isScheduling}
          >
            {isScheduling ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : null}
            {isScheduling ? "Scheduling..." : "Schedule Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
