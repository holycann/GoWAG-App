import React from "react"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AutoReplyRuleFormProps {
  initialData?: any
  onSave?: (data: any) => void
  onCancel?: () => void
}

export function AutoReplyRuleForm({ initialData, onSave, onCancel }: AutoReplyRuleFormProps) {
  // Form state would go here in a real implementation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onSave?.({})
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create Auto-Reply Rule</DialogTitle>
          <DialogDescription>
            Set up a new automated response for incoming messages
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Rule Name
            </Label>
            <Input 
              id="name" 
              placeholder="e.g., Welcome Message" 
              className="col-span-3" 
              defaultValue={initialData?.name}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="session" className="text-right">
              Apply to Session
            </Label>
            <Select defaultValue={initialData?.session || "all"}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a WhatsApp session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="primary">Primary WhatsApp</SelectItem>
                <SelectItem value="support">Support WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Trigger Type
            </Label>
            <div className="col-span-3 space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="keyword" 
                  name="trigger-type" 
                  className="form-radio"
                  defaultChecked={initialData?.triggerType === 'keyword'} 
                />
                <Label htmlFor="keyword" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Keyword Match
                </Label>
              </div>
              
              <div className="pl-6">
                <Label htmlFor="keywords" className="text-sm">
                  Keywords (comma separated)
                </Label>
                <Input 
                  id="keywords" 
                  placeholder="hello, hi, hey, start, begin" 
                  className="mt-1"
                  defaultValue={initialData?.keywords}
                />
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch 
                    id="exact-match" 
                    defaultChecked={initialData?.exactMatch}
                  />
                  <Label htmlFor="exact-match">Exact match only</Label>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <input 
                  type="radio" 
                  id="all-messages" 
                  name="trigger-type" 
                  className="form-radio"
                  defaultChecked={initialData?.triggerType === 'all'} 
                />
                <Label htmlFor="all-messages">
                  All new messages
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <input 
                  type="radio" 
                  id="first-time" 
                  name="trigger-type" 
                  className="form-radio"
                  defaultChecked={initialData?.triggerType === 'first-time'} 
                />
                <Label htmlFor="first-time">
                  First-time users only
                </Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Active Time
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="all-time" 
                  defaultChecked={initialData?.allTime ?? true}
                />
                <Label htmlFor="all-time">Active at all times</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="start-time" className="text-sm">From</Label>
                  <Input 
                    type="time" 
                    id="start-time" 
                    className="mt-1" 
                    defaultValue={initialData?.startTime}
                    disabled={initialData?.allTime ?? true}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time" className="text-sm">To</Label>
                  <Input 
                    type="time" 
                    id="end-time" 
                    className="mt-1" 
                    defaultValue={initialData?.endTime}
                    disabled={initialData?.allTime ?? true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="response" className="text-right pt-2">
              Response Message
            </Label>
            <div className="col-span-3">
              <Textarea
                id="response"
                placeholder="Auto-reply message content..."
                rows={5}
                defaultValue={initialData?.response}
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can use {'{name}'}, {'{phone}'} as variables to personalize the message
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch 
                id="active" 
                defaultChecked={initialData?.active ?? true}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Save Rule</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
} 