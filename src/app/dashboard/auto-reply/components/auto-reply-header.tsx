import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AutoReplyRuleForm } from "./auto-reply-rule-form"

interface AutoReplyHeaderProps {
  title: string
  description: string
  onCreateRule?: (data: any) => void
}

export function AutoReplyHeader({ title, description, onCreateRule }: AutoReplyHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Rule
          </Button>
        </DialogTrigger>
        <AutoReplyRuleForm onSave={onCreateRule} />
      </Dialog>
    </div>
  )
} 