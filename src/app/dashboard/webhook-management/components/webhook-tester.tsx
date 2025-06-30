import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Code, CheckCircle, ArrowRight, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WebhookTesterProps {
  onTest?: (data: any) => void
}

export function WebhookTester({ onTest }: WebhookTesterProps) {
  // In a real implementation, we'd track test results with useState
  const hasTestResults = false
  const isSuccess = true

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault()
    onTest?.({})
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Webhook Delivery</CardTitle>
          <CardDescription>
            Send test events to your webhook endpoints
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleTest}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhook-endpoint">Webhook Endpoint</Label>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select endpoint to test" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Webhook</SelectItem>
                      <SelectItem value="backup">Backup Webhook</SelectItem>
                      <SelectItem value="dev">Development Webhook</SelectItem>
                      <SelectItem value="custom">Custom URL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-url">Custom URL</Label>
                  <Input 
                    id="custom-url" 
                    placeholder="https://" 
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="message.received">message:received</SelectItem>
                      <SelectItem value="message.sent">message:sent</SelectItem>
                      <SelectItem value="message.status">message:status</SelectItem>
                      <SelectItem value="session.status">session:status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="payload-data">Payload Data</Label>
                <Textarea 
                  id="payload-data"
                  placeholder="Enter or modify the JSON payload data"
                  className="h-40 font-mono text-sm mt-1"
                  defaultValue={`{
  "event": "message:received",
  "data": {
    "id": "msg_12345",
    "from": "+1234567890",
    "body": "Hello world",
    "timestamp": "2023-09-15T10:30:00Z"
  }
}`}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send Test Webhook
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {hasTestResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {isSuccess 
                ? <CheckCircle className="text-green-500 mr-2 h-5 w-5" /> 
                : <AlertCircle className="text-red-500 mr-2 h-5 w-5" />
              }
              Webhook Test Results
            </CardTitle>
            <CardDescription>
              {isSuccess 
                ? "Test webhook delivered successfully" 
                : "Webhook delivery failed"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="response">
              <TabsList className="mb-4">
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="request">Request</TabsTrigger>
              </TabsList>
              
              <TabsContent value="response">
                <div className="bg-muted rounded-md p-4 overflow-auto max-h-80 font-mono text-sm">
                  <div className="flex items-center gap-2 text-green-500 dark:text-green-400 mb-2">
                    <ArrowRight className="h-4 w-4" />
                    <span>Status: 200 OK</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">Response Headers:</div>
                  <pre className="text-xs text-muted-foreground mb-4">
                    {`Content-Type: application/json
Date: Thu, 15 Sep 2023 10:30:05 GMT
Server: nginx/1.18.0
Content-Length: 25`}
                  </pre>
                  <div className="text-xs text-muted-foreground mb-2">Response Body:</div>
                  <pre className="text-xs">
                    {`{
  "success": true,
  "received": true
}`}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="request">
                <div className="bg-muted rounded-md p-4 overflow-auto max-h-80 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4" />
                    <span>POST /webhooks/whatsapp HTTP/1.1</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">Request Headers:</div>
                  <pre className="text-xs text-muted-foreground mb-4">
                    {`Content-Type: application/json
X-Signature-256: sha256=abc123...
User-Agent: WhatsAppGateway/1.0
Content-Length: 145`}
                  </pre>
                  <div className="text-xs text-muted-foreground mb-2">Request Body:</div>
                  <pre className="text-xs">
                    {`{
  "event": "message:received",
  "data": {
    "id": "msg_12345",
    "from": "+1234567890",
    "body": "Hello world",
    "timestamp": "2023-09-15T10:30:00Z"
  }
}`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 