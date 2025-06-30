import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { NewApiKeyDialog } from "./new-api-key-dialog"

interface ApiKeysHeaderProps {
  title: string
  description: string
  onGenerateKey: (data: any) => void
}

export function ApiKeysHeader({ title, description, onGenerateKey }: ApiKeysHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Generate API Key
          </Button>
        </DialogTrigger>
        <NewApiKeyDialog onGenerateKey={onGenerateKey} />
      </Dialog>
    </div>
  )
} 