import React, { useState } from "react"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface NewApiKeyDialogProps {
  onGenerateKey: (data: {
    name: string
    type: string
    expiry: string
    permissions: string[]
  }) => void
}

export function NewApiKeyDialog({ onGenerateKey }: NewApiKeyDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    expiry: "",
    permissions: [
      {
        id: "messages.read",
        name: "Read Messages",
        description: "Access to view message history",
        enabled: false
      },
      {
        id: "messages.send",
        name: "Send Messages",
        description: "Permission to send messages via API",
        enabled: true
      },
      {
        id: "sessions.read",
        name: "View Sessions",
        description: "Check WhatsApp connection status",
        enabled: true
      },
      {
        id: "sessions.manage",
        name: "Manage Sessions",
        description: "Connect/disconnect WhatsApp sessions",
        enabled: false
      },
      {
        id: "webhooks.manage",
        name: "Manage Webhooks",
        description: "Configure webhook endpoints",
        enabled: false
      }
    ] as Permission[]
  })

  const handlePermissionChange = (permissionId: string, enabled: boolean) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.map(permission => 
        permission.id === permissionId ? { ...permission, enabled } : permission
      )
    })
  }

  const handleGenerateKey = () => {
    onGenerateKey({
      name: formData.name,
      type: formData.type,
      expiry: formData.expiry,
      permissions: formData.permissions
        .filter(permission => permission.enabled)
        .map(permission => permission.id)
    })
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogDescription>
          Create a new API key for external access to the WhatsApp Gateway.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="key-name">Key Name</Label>
          <Input
            id="key-name"
            placeholder="e.g. Production API Key"
            className="mt-1"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="key-type">Key Type</Label>
          <Select onValueChange={(value) => setFormData({...formData, type: value})}>
            <SelectTrigger id="key-type" className="mt-1">
              <SelectValue placeholder="Select key type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Production (Live)</SelectItem>
              <SelectItem value="test">Development (Test)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expiry">Expiry Date</Label>
          <Select onValueChange={(value) => setFormData({...formData, expiry: value})}>
            <SelectTrigger id="expiry" className="mt-1">
              <SelectValue placeholder="Select expiration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="180d">6 months</SelectItem>
              <SelectItem value="365d">1 year</SelectItem>
              <SelectItem value="never">No expiration (not recommended)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block mb-2">Permissions</Label>
          <div className="space-y-2 bg-muted p-3 rounded-md">
            {formData.permissions.map((permission, index) => (
              <React.Fragment key={permission.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{permission.name}</span>
                    <p className="text-sm text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                  <Switch 
                    checked={permission.enabled}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                  />
                </div>
                {index < formData.permissions.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleGenerateKey}>Generate API Key</Button>
      </DialogFooter>
    </DialogContent>
  )
} 