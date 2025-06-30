import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SingleMessageForm } from "./single-message-form"
import { RecentConversations } from "./recent-conversations"
import { BulkMessageForm } from "./bulk-message-form"
import { MessageTemplates } from "./message-templates"

interface WhatsAppSession {
  id: string
  name: string
  phoneNumber: string
}

interface Contact {
  id: string
  name: string
  phoneNumber: string
  initials: string
}

interface MessageTemplate {
  id: string
  title: string
  description: string
  content: string
}

interface MessagesTabsProps {
  sessions: WhatsAppSession[]
  contacts: Contact[]
  templates: MessageTemplate[]
  onSendMessage: (data: any) => void
  onSelectContact: (contact: Contact) => void
  onViewAllContacts: () => void
  onSendBulk: (data: any) => void
  onPreviewBulk: (data: any) => void
  onSelectTemplate: () => void
  onEditTemplate: (template: MessageTemplate) => void
  onUseTemplate: (template: MessageTemplate) => void
  onCreateTemplate: () => void
}

export function MessagesTabs({
  sessions,
  contacts,
  templates,
  onSendMessage,
  onSelectContact,
  onViewAllContacts,
  onSendBulk,
  onPreviewBulk,
  onSelectTemplate,
  onEditTemplate,
  onUseTemplate,
  onCreateTemplate
}: MessagesTabsProps) {
  return (
    <Tabs defaultValue="single">
      <TabsList className="mb-4">
        <TabsTrigger value="single">Single Message</TabsTrigger>
        <TabsTrigger value="bulk">Bulk Messages</TabsTrigger>
        <TabsTrigger value="template">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="single">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SingleMessageForm
            sessions={sessions}
            onSend={onSendMessage}
          />
          <RecentConversations
            contacts={contacts}
            onSelectContact={onSelectContact}
            onViewAllContacts={onViewAllContacts}
          />
        </div>
      </TabsContent>

      <TabsContent value="bulk">
        <BulkMessageForm
          sessions={sessions}
          onSendBulk={onSendBulk}
          onPreview={onPreviewBulk}
          onSelectTemplate={onSelectTemplate}
        />
      </TabsContent>

      <TabsContent value="template">
        <MessageTemplates
          templates={templates}
          onEditTemplate={onEditTemplate}
          onUseTemplate={onUseTemplate}
          onCreateTemplate={onCreateTemplate}
        />
      </TabsContent>
    </Tabs>
  )
} 