import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Key } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebhookFormProps {
  initialData?: {
    id?: string
    name?: string
    url?: string
    secretKey?: string
    events?: {
      messageReceived?: boolean
      messageSent?: boolean
      messageStatus?: boolean
      sessionStatus?: boolean
    }
    retryStrategy?: 'exponential' | 'fixed' | 'none'
    active?: boolean
  }
  onSave?: (data: any) => void
  onCancel?: () => void
}

export function WebhookForm({
  initialData,
  onSave,
  onCancel
}: WebhookFormProps) {
  // Form state management would go here in a real implementation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form data
    onSave?.({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Configuration</CardTitle>
        <CardDescription>
          Set up a new webhook endpoint or edit an existing one
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Webhook Name</Label>
                <Input 
                  id="webhook-name" 
                  placeholder="e.g. Primary Webhook"
                  defaultValue={initialData?.name} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://your-server.com/webhook"
                  defaultValue={initialData?.url} 
                />
                <p className="text-sm text-muted-foreground">
                  URL that will receive HTTP POST requests with event data
                </p>
              </div>

              <div className="space-y-2">
                <Label>Secret Key</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="secret-key" 
                    type="password" 
                    defaultValue={initialData?.secretKey || "sk_test_12345678901234567890"} 
                  />
                  <Button variant="outline" size="sm" type="button">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to sign webhook payloads for verification
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Events to Send</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="message-received" 
                      defaultChecked={initialData?.events?.messageReceived}
                    />
                    <Label htmlFor="message-received">message:received</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="message-sent" 
                      defaultChecked={initialData?.events?.messageSent}
                    />
                    <Label htmlFor="message-sent">message:sent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="message-status" 
                      defaultChecked={initialData?.events?.messageStatus}
                    />
                    <Label htmlFor="message-status">message:status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="session-status" 
                      defaultChecked={initialData?.events?.sessionStatus}
                    />
                    <Label htmlFor="session-status">session:status</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-strategy">Retry Strategy</Label>
                <Select defaultValue={initialData?.retryStrategy || "exponential"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a retry strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exponential">Exponential Backoff</SelectItem>
                    <SelectItem value="fixed">Fixed Interval</SelectItem>
                    <SelectItem value="none">No Retries</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How to handle failed webhook deliveries
                </p>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="webhook-active" 
                  defaultChecked={initialData?.active ?? true}
                />
                <Label htmlFor="webhook-active">Webhook Active</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="mr-2" 
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Save Webhook</Button>
        </CardFooter>
      </form>
    </Card>
  )
} 