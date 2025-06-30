import React from "react"
import { MessageTemplateCard } from "./message-template-card"
import { CreateTemplateCard } from "./create-template-card"

interface MessageTemplate {
  id: string
  title: string
  description: string
  content: string
}

interface MessageTemplatesProps {
  templates: MessageTemplate[]
  onEditTemplate: (template: MessageTemplate) => void
  onUseTemplate: (template: MessageTemplate) => void
  onCreateTemplate: () => void
}

export function MessageTemplates({ 
  templates, 
  onEditTemplate, 
  onUseTemplate, 
  onCreateTemplate 
}: MessageTemplatesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map(template => (
        <MessageTemplateCard
          key={template.id}
          template={template}
          onEdit={onEditTemplate}
          onUse={onUseTemplate}
        />
      ))}
      <CreateTemplateCard onClick={onCreateTemplate} />
    </div>
  )
} 