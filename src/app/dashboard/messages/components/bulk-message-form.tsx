import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Send } from "lucide-react"

interface WhatsAppSession {
  id: string
  name: string
  phoneNumber: string
}

interface BulkMessageFormProps {
  sessions: WhatsAppSession[]
  onSendBulk: (data: {
    sessionId: string
    messageTemplate: string
    file: File | null
    delayEnabled: boolean
    delaySeconds: number
  }) => void
  onPreview: (data: {
    sessionId: string
    messageTemplate: string
    file: File | null
  }) => void
  onSelectTemplate: () => void
}

export function BulkMessageForm({ 
  sessions, 
  onSendBulk, 
  onPreview,
  onSelectTemplate 
}: BulkMessageFormProps) {
  const [formData, setFormData] = React.useState({
    sessionId: sessions[0]?.id || '',
    messageTemplate: '',
    file: null as File | null,
    delayEnabled: false,
    delaySeconds: 3
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFormData({...formData, file: files[0]})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSendBulk(formData)
  }

  const handlePreviewClick = () => {
    onPreview({
      sessionId: formData.sessionId,
      messageTemplate: formData.messageTemplate,
      file: formData.file
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Message</CardTitle>
        <CardDescription>
          Kirim pesan ke banyak nomor sekaligus
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-bulk">WhatsApp Session</Label>
            <select
              id="session-bulk"
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
            <Label htmlFor="recipients">Recipients</Label>
            <div className="flex items-start space-x-2">
              <div className="flex-1">
                <Input 
                  type="file" 
                  id="recipients-file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.file ? formData.file.name : 'Upload CSV/Excel'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  File should contain columns for phone numbers and variables
                </p>
              </div>
              <Button variant="outline" type="button" onClick={onSelectTemplate}>
                Template
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bulk-message">Message Template</Label>
            <Textarea
              id="bulk-message"
              placeholder="Hello {name}, thank you for your order {order_id}..."
              rows={5}
              value={formData.messageTemplate}
              onChange={e => setFormData({...formData, messageTemplate: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">
              Use {'{variable_name}'} for dynamic content from your CSV/Excel file
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="delay" 
                  checked={formData.delayEnabled}
                  onCheckedChange={checked => setFormData({...formData, delayEnabled: checked})}
                />
                <Label htmlFor="delay">Add random delay between messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  type="number" 
                  className="w-16" 
                  value={formData.delaySeconds} 
                  min="1" 
                  max="60"
                  onChange={e => setFormData({...formData, delaySeconds: parseInt(e.target.value) || 3})}
                  disabled={!formData.delayEnabled}
                />
                <span className="text-sm">seconds</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={handlePreviewClick}>
            Preview
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" /> Send to All
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
} 