"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageAlert } from "../components/page-alert"
import { PageHeader } from "../components/page-header"
import {
  ScheduledMessageList,
  ScheduledStats,
  ScheduleMessageDialog,
  EditScheduleDialog,
  DeleteMessageDialog,
  ScheduledMessage,
  ScheduleMessageFormData
} from "./components"

// Sample contact groups for recipient selection
const recipientGroups = [
  { id: "group_1", name: "All Customers" },
  { id: "group_2", name: "VIP Customers" },
  { id: "group_3", name: "New Leads" },
  { id: "group_4", name: "Newsletter Subscribers" },
  { id: "group_5", name: "Invoice Clients" },
];

const initialScheduledMessagesData: ScheduledMessage[] = [
  {
    id: "sched_1",
    subject: "Morning Greeting",
    message: "Good morning! Hope you have a great day ahead. Here's your daily update.",
    recipients: ["All Customers", "VIP Customers"],
    recipientCount: 60,
    scheduledFor: "2023-07-10T08:00:00",
    status: "scheduled",
    recurring: "daily",
    lastSent: null,
    createdAt: "2023-06-25T10:30:00",
  },
  {
    id: "sched_2",
    subject: "Weekend Special Offer",
    message: "Don't miss our special weekend offer! Get 20% off on all products this weekend only.",
    recipients: ["All Customers"],
    recipientCount: 48,
    scheduledFor: "2023-07-08T10:00:00",
    status: "scheduled",
    recurring: "weekly",
    lastSent: "2023-07-01T10:00:00",
    createdAt: "2023-06-15T15:45:00",
  },
  {
    id: "sched_3",
    subject: "Monthly Newsletter",
    message: "Here's your monthly newsletter with all the latest updates and tips from our team.",
    recipients: ["Newsletter Subscribers"],
    recipientCount: 156,
    scheduledFor: "2023-08-01T14:00:00",
    status: "scheduled",
    recurring: "monthly",
    lastSent: "2023-07-01T14:00:00",
    createdAt: "2023-05-28T11:20:00",
  },
  {
    id: "sched_4",
    subject: "Payment Reminder",
    message: "This is a friendly reminder that your invoice is due in 3 days. Please make the payment at your earliest convenience.",
    recipients: ["Invoice Clients"],
    recipientCount: 15,
    scheduledFor: "2023-07-07T09:00:00",
    status: "paused",
    recurring: "monthly",
    lastSent: "2023-06-07T09:00:00",
    createdAt: "2023-04-10T16:30:00",
  },
  {
    id: "sched_5",
    subject: "Service Maintenance",
    message: "We will be performing maintenance on our systems tomorrow from 2-4AM. Service might be intermittent during this time.",
    recipients: ["All Customers"],
    recipientCount: 48,
    scheduledFor: "2023-07-05T18:00:00",
    status: "sent",
    recurring: null,
    lastSent: "2023-07-05T18:00:00",
    createdAt: "2023-07-03T09:15:00",
  },
]

export default function ScheduledMessagesPage() {
  const [scheduledMessages, setScheduledMessages] = React.useState<ScheduledMessage[]>(initialScheduledMessagesData)
  const [alertInfo, setAlertInfo] = React.useState<{ type: "success" | "error"; title: string; message: string } | null>(null)
  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedMessage, setSelectedMessage] = React.useState<ScheduledMessage | null>(null)

  const handleNewMessageScheduled = async (data: ScheduleMessageFormData) => {
    // Create a new message from the form data
    const newMessage: ScheduledMessage = {
      id: `sched_${Date.now()}`,
      subject: data.subject,
      message: data.message,
      recipients: data.recipientGroup 
        ? [recipientGroups.find(g => g.id === data.recipientGroup)?.name || "Unknown Group"] 
        : [data.recipient],
      recipientCount: data.recipientGroup ? 
        (data.recipientGroup === "group_1" ? 48 : 
         data.recipientGroup === "group_2" ? 12 : 
         data.recipientGroup === "group_3" ? 31 : 
         data.recipientGroup === "group_4" ? 156 : 15) : 1,
      scheduledFor: data.scheduleTime,
      status: "scheduled",
      recurring: data.recurring || null,
      lastSent: null,
      createdAt: new Date().toISOString(),
    };
    
    // Add the new message to the list
    setScheduledMessages((prev) => [newMessage, ...prev]);
    
    // Show success alert
    setAlertInfo({
      type: "success",
      title: "Scheduled!",
      message: "New message has been scheduled successfully.",
    });
    
    // Clear alert after 3 seconds
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleEditMessage = (message: ScheduledMessage) => {
    setSelectedMessage(message);
    setEditDialogOpen(true);
  };

  const handleSaveEditedMessage = (updatedMessage: ScheduledMessage) => {
    setScheduledMessages((prev) =>
      prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
    );
    
    setAlertInfo({
      type: "success",
      title: "Updated!",
      message: "Scheduled message updated successfully.",
    });
    
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    // Remove the message from the list
    setScheduledMessages((prev) => prev.filter((msg) => msg.id !== selectedMessage.id));
    
    // Show success alert
    setAlertInfo({
      type: "success",
      title: "Deleted!",
      message: `Message to ${selectedMessage.recipients.join(", ")} deleted.`,
    });
    
    // Clear alert after 3 seconds
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handlePauseMessage = (message: ScheduledMessage) => {
    setScheduledMessages((prev) =>
      prev.map((msg) => (msg.id === message.id ? { ...msg, status: "paused" } : msg))
    );
    
    setAlertInfo({
      type: "success",
      title: "Paused",
      message: "Message has been paused.",
    });
    
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleResumeMessage = (message: ScheduledMessage) => {
    setScheduledMessages((prev) =>
      prev.map((msg) => (msg.id === message.id ? { ...msg, status: "scheduled" } : msg))
    );
    
    setAlertInfo({
      type: "success",
      title: "Resumed",
      message: "Message has been resumed.",
    });
    
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleDuplicateMessage = (message: ScheduledMessage) => {
    const duplicatedMessage: ScheduledMessage = {
      ...message,
      id: `sched_${Date.now()}`,
      subject: `${message.subject} (Copy)`,
      createdAt: new Date().toISOString(),
      lastSent: null,
    };
    
    setScheduledMessages((prev) => [duplicatedMessage, ...prev]);
    
    setAlertInfo({
      type: "success",
      title: "Duplicated",
      message: "Message has been duplicated.",
    });
    
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleOpenDeleteDialog = (message: ScheduledMessage) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  // Calculate stats
  const activeCount = scheduledMessages.filter(msg => msg.status === "scheduled").length;
  const pausedCount = scheduledMessages.filter(msg => msg.status === "paused").length;
  const sentCount = scheduledMessages.filter(msg => msg.status === "sent").length;
  const totalCount = scheduledMessages.length;

  // Get upcoming messages (scheduled for the next 24 hours)
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const upcomingMessages = scheduledMessages
    .filter(msg => msg.status === "scheduled" && new Date(msg.scheduledFor) <= tomorrow)
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());

  return (
    <div className="container mx-auto p-6">
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Scheduled Messages"
          description="Set up and manage scheduled messages and reminders"
        />
        <Button onClick={() => setScheduleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <ScheduledStats
          activeCount={activeCount}
          pausedCount={pausedCount}
          sentCount={sentCount}
          totalCount={totalCount}
          upcomingMessages={upcomingMessages}
        />
      </div>
      
      <ScheduledMessageList
        messages={scheduledMessages}
        onEdit={handleEditMessage}
        onDelete={handleOpenDeleteDialog}
        onPause={handlePauseMessage}
        onResume={handleResumeMessage}
        onDuplicate={handleDuplicateMessage}
      />
      
      <ScheduleMessageDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        onSchedule={handleNewMessageScheduled}
        recipientGroups={recipientGroups}
      />
      
      {selectedMessage && (
        <>
          <EditScheduleDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            message={selectedMessage}
            onSave={handleSaveEditedMessage}
            recipientGroups={recipientGroups}
          />
          
          <DeleteMessageDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            message={selectedMessage}
            onDelete={handleDeleteMessage}
          />
        </>
      )}
    </div>
  )
}
