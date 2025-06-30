import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { MessageSquare, Image, FileText, Send } from "lucide-react"

interface WhatsAppSession {
  id: string
  name: string
  phoneNumber: string
}

interface SingleMessageFormProps {
  sessions: WhatsAppSession[]
  onSend: (data: {
    sessionId: string
    recipient: string
    message: string
    messageType: 'text' | 'media' | 'document'
    scheduled: boolean
  }) => void
}

export function SingleMessageForm({ sessions, onSend }: SingleMessageFormProps) {
  const [formData, setFormData] = React.useState({
    sessionId: sessions[0]?.id || '',
    recipient: '',
    message: '',
    messageType: 'text' as 'text' | 'media' | 'document',
    scheduled: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Single Message</CardTitle>
        <CardDescription>
          Kirim pesan ke nomor WhatsApp tertentu
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session">WhatsApp Session</Label>
            <select
              id="session"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.sessionId}
              onChange={e => setFormData({...formData, sessionId: e.target.value})}
            >
              {sessions.map(session => (
                <option key={session.id} value={session.id}>
                  {session.name} ({session.phoneNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input 
              type="text" 
              id="recipient" 
              placeholder="e.g., +62 812-3456-7890" 
              value={formData.recipient}
              onChange={e => setFormData({...formData, recipient: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here..."
              rows={5}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Message Type</Label>
            <RadioGroup 
              value={formData.messageType} 
              onValueChange={value => setFormData({...formData, messageType: value as 'text' | 'media' | 'document'})}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" /> Text Message
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="media" id="media" />
                <Label htmlFor="media" className="flex items-center">
                  <Image className="mr-2 h-4 w-4" /> Media Message
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="document" id="document" />
                <Label htmlFor="document" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" /> Document
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="schedule" 
                checked={formData.scheduled}
                onCheckedChange={checked => setFormData({...formData, scheduled: checked})}
              />
              <Label htmlFor="schedule">Schedule for later</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            <Send className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 