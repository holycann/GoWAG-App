import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MessageTemplate {
  id: string
  title: string
  description: string
  content: string
}

interface MessageTemplateCardProps {
  template: MessageTemplate
  onEdit: (template: MessageTemplate) => void
  onUse: (template: MessageTemplate) => void
}

export function MessageTemplateCard({ template, onEdit, onUse }: MessageTemplateCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {template.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(template)}
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onUse(template)}
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  )
} 