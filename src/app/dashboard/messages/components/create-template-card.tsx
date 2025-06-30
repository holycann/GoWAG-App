import React from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

interface CreateTemplateCardProps {
  onClick: () => void
}

export function CreateTemplateCard({ onClick }: CreateTemplateCardProps) {
  return (
    <Card className="border-dashed flex items-center justify-center h-full">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="rounded-full bg-muted p-3 mb-2">
          <MessageSquare className="h-6 w-6" />
        </div>
        <CardTitle className="text-center mb-1">Create Template</CardTitle>
        <CardDescription className="text-center">Create a new reusable message template</CardDescription>
        <Button className="mt-4" onClick={onClick}>Create</Button>
      </CardContent>
    </Card>
  )
} 