"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit3, Trash2, MoreHorizontal, Clock, Users, MessageCircle, ShieldAlert } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScheduleMessageDialog } from "./components/schedule-message-dialog"
import { EditScheduleDialog } from "./components/edit-schedule-dialog" // Import Edit Dialog
import { PageAlert } from "../components/page-alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog" // AlertDialogTrigger is not needed if controlled manually

interface ScheduledMessage {
  id: string
  recipient: string
  messageSnippet: string
  scheduledTime: string
  status: string
}

const initialScheduledMessagesData: ScheduledMessage[] = [
  {
    id: "sm1",
    recipient: "+12345678901",
    messageSnippet: "Team meeting reminder for tomorrow...",
    scheduledTime: "2025-06-23 10:00 AM",
    status: "Scheduled",
  },
  {
    id: "sm2",
    recipient: "Marketing Group",
    messageSnippet: "New campaign launch next week!",
    scheduledTime: "2025-06-28 09:00 AM",
    status: "Scheduled",
  },
  // ... more data
]

export default function ScheduledMessagesPage() {
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>(initialScheduledMessagesData)
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)
  const [messageToEdit, setMessageToEdit] = useState<ScheduledMessage | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<ScheduledMessage | null>(null)

  const handleNewMessageScheduled = (data: { recipient: string; message: string; scheduleTime: string }) => {
    const newMessage: ScheduledMessage = {
      id: `sm${Date.now()}`, // Simple unique ID
      recipient: data.recipient,
      messageSnippet: data.message.substring(0, 50) + (data.message.length > 50 ? "..." : ""),
      scheduledTime: new Date(data.scheduleTime).toLocaleString(), // Format for display
      status: "Scheduled",
    }
    setScheduledMessages((prev) => [newMessage, ...prev])
    setAlertInfo({ type: "success", title: "Scheduled!", message: "New message has been scheduled successfully." })
    setTimeout(() => setAlertInfo(null), 3000)
  }

  const handleEditMessage = (message: ScheduledMessage) => {
    setMessageToEdit(message)
    setIsEditDialogOpen(true)
  }

  const handleSaveEditedMessage = (updatedMessage: ScheduledMessage) => {
    setScheduledMessages((prev) =>
      prev.map((msg) =>
        msg.id === updatedMessage.id
          ? { ...updatedMessage, scheduledTime: new Date(updatedMessage.scheduledTime).toLocaleString() }
          : msg,
      ),
    )
    setAlertInfo({ type: "success", title: "Updated!", message: "Scheduled message updated successfully." })
    setTimeout(() => setAlertInfo(null), 3000)
  }

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return

    // --- Placeholder for actual delete logic ---
    console.log("Deleting message:", messageToDelete.id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setScheduledMessages((prev) => prev.filter((msg) => msg.id !== messageToDelete.id))
    setAlertInfo({ type: "success", title: "Deleted!", message: `Message to ${messageToDelete.recipient} deleted.` })
    // --- End of placeholder ---
    setMessageToDelete(null) // Close dialog
    setTimeout(() => setAlertInfo(null), 3000)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-fadeIn">
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brandDarkBlue">Scheduled Messages</h1>
          <p className="text-muted-foreground">Manage your upcoming and past scheduled messages.</p>
        </div>
        <ScheduleMessageDialog onSchedule={handleNewMessageScheduled} />
      </header>

      <Card className="rounded-xl shadow-md animate-slideUp">
        <CardHeader>
          <CardTitle className="text-gray-700">Message Queue</CardTitle>
          <CardDescription>
            {scheduledMessages.length > 0
              ? `You have ${scheduledMessages.filter((m) => m.status === "Scheduled" || m.status === "Pending").length} pending messages.`
              : "No messages currently scheduled."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scheduledMessages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-gray-600">
                    <Users className="inline-block mr-1 h-4 w-4" />
                    Recipient
                  </TableHead>
                  <TableHead className="text-gray-600">
                    <MessageCircle className="inline-block mr-1 h-4 w-4" />
                    Message Snippet
                  </TableHead>
                  <TableHead className="w-[180px] text-gray-600">
                    <Clock className="inline-block mr-1 h-4 w-4" />
                    Scheduled Time
                  </TableHead>
                  <TableHead className="w-[120px] text-gray-600">Status</TableHead>
                  <TableHead className="w-[100px] text-right text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledMessages.map((msg) => (
                  <TableRow key={msg.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-800">{msg.recipient}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-xs">{msg.messageSnippet}</TableCell>
                    <TableCell className="text-muted-foreground">{msg.scheduledTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          msg.status === "Scheduled"
                            ? "default"
                            : msg.status === "Sent"
                              ? "secondary"
                              : msg.status === "Pending"
                                ? "outline"
                                : "destructive"
                        }
                        className={
                          msg.status === "Scheduled"
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : msg.status === "Sent"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : msg.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : ""
                        }
                      >
                        {msg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-brandDarkBlue"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="group" onClick={() => handleEditMessage(msg)}>
                            <Edit3 className="mr-2 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />{" "}
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 group" onClick={() => setMessageToDelete(msg)}>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />{" "}
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven't scheduled any messages yet.</p>
              {/* Trigger for ScheduleMessageDialog can be placed here too */}
            </div>
          )}
        </CardContent>
      </Card>

      {messageToEdit && (
        <EditScheduleDialog
          messageData={messageToEdit}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSaveEditedMessage}
        />
      )}

      {messageToDelete && (
        <AlertDialog open={!!messageToDelete} onOpenChange={(isOpen) => !isOpen && setMessageToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-red-500" /> Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the scheduled message to "<strong>{messageToDelete.recipient}</strong>"?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setMessageToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteMessage} className="bg-red-600 hover:bg-red-700 text-white">
                Delete Message
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
