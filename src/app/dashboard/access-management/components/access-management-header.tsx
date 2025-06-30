import React from "react"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface AccessManagementHeaderProps {
  title: string
  description: string
  onInviteUser: () => void
}

export function AccessManagementHeader({
  title,
  description,
  onInviteUser
}: AccessManagementHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <Button onClick={onInviteUser}>
        <UserPlus className="mr-2 h-4 w-4" /> Invite User
      </Button>
    </div>
  )
} 