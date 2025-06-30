import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Role {
  id: string
  name: string
  description: string
  permissionCount: number
}

interface InviteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roles: Role[]
  onInvite: (userData: {
    email: string
    name: string
    role: string
    sendWelcome: boolean
  }) => void
}

export function InviteUserDialog({
  open,
  onOpenChange,
  roles,
  onInvite
}: InviteUserDialogProps) {
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [role, setRole] = React.useState("")
  const [sendWelcome, setSendWelcome] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onInvite({
      email,
      name,
      role,
      sendWelcome
    })
    resetForm()
  }

  const resetForm = () => {
    setEmail("")
    setName("")
    setRole("")
    setSendWelcome(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Send an invitation email to add a new user to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="user-email">Email Address</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="email@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                placeholder="Full name"
                className="mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="user-role" className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                You can adjust specific permissions after inviting the user.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="send-welcome" 
                checked={sendWelcome} 
                onCheckedChange={setSendWelcome} 
              />
              <Label htmlFor="send-welcome">Send welcome email</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 