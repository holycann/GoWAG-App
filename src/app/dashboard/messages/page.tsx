"use client"

import React from "react"
import { MessagesHeader, MessagesTabs } from "./components"

// Sample data
const sessions = [
  { id: "primary", name: "Primary WhatsApp", phoneNumber: "+62 812-3456-7890" },
  { id: "support", name: "Support WhatsApp", phoneNumber: "+62 877-1234-5678" }
]

const contacts = [
  { id: "1", name: "John Doe", phoneNumber: "+62 812-3456-7891", initials: "JD" },
  { id: "2", name: "Jane Smith", phoneNumber: "+62 812-3456-7892", initials: "JS" },
  { id: "3", name: "Bob Johnson", phoneNumber: "+62 812-3456-7893", initials: "BJ" },
  { id: "4", name: "Alice Brown", phoneNumber: "+62 812-3456-7894", initials: "AB" },
  { id: "5", name: "Charlie Davis", phoneNumber: "+62 812-3456-7895", initials: "CD" }
]

const templates = [
  {
    id: "1",
    title: "Welcome Message 1",
    description: "For new customers",
    content: "Hello {name}, welcome to our service! We're happy to have you here. If you have any questions, feel free to respond to this message."
  },
  {
    id: "2",
    title: "Welcome Message 2",
    description: "For new customers",
    content: "Hello {name}, welcome to our service! We're happy to have you here. If you have any questions, feel free to respond to this message."
  },
  {
    id: "3",
    title: "Welcome Message 3",
    description: "For new customers",
    content: "Hello {name}, welcome to our service! We're happy to have you here. If you have any questions, feel free to respond to this message."
  },
  {
    id: "4",
    title: "Welcome Message 4",
    description: "For new customers",
    content: "Hello {name}, welcome to our service! We're happy to have you here. If you have any questions, feel free to respond to this message."
  },
  {
    id: "5",
    title: "Welcome Message 5",
    description: "For new customers",
    content: "Hello {name}, welcome to our service! We're happy to have you here. If you have any questions, feel free to respond to this message."
  }
]

export default function MessagesPage() {
  // Message sending handlers
  const handleSendMessage = (data: any) => {
    console.log("Sending single message:", data)
  }

  const handleSelectContact = (contact: any) => {
    console.log("Selected contact:", contact)
  }

  const handleViewAllContacts = () => {
    console.log("Viewing all contacts")
  }

  const handleSendBulk = (data: any) => {
    console.log("Sending bulk messages:", data)
  }

  const handlePreviewBulk = (data: any) => {
    console.log("Previewing bulk message:", data)
  }

  const handleSelectTemplate = () => {
    console.log("Selecting template")
  }

  const handleEditTemplate = (template: any) => {
    console.log("Editing template:", template)
  }

  const handleUseTemplate = (template: any) => {
    console.log("Using template:", template)
  }

  const handleCreateTemplate = () => {
    console.log("Creating new template")
  }

  return (
    <div className="container mx-auto p-6">
      <MessagesHeader 
        title="Messages" 
        description="Kirim pesan langsung atau blast message ke banyak nomor" 
      />
      
      <MessagesTabs
        sessions={sessions}
        contacts={contacts}
        templates={templates}
        onSendMessage={handleSendMessage}
        onSelectContact={handleSelectContact}
        onViewAllContacts={handleViewAllContacts}
        onSendBulk={handleSendBulk}
        onPreviewBulk={handlePreviewBulk}
        onSelectTemplate={handleSelectTemplate}
        onEditTemplate={handleEditTemplate}
        onUseTemplate={handleUseTemplate}
        onCreateTemplate={handleCreateTemplate}
      />
    </div>
  )
} 