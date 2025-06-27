"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Paperclip, SendHorizonal, MessageSquarePlus, Smile, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageAlert } from "../components/page-alert"

// Dummy templates
const messageTemplates = [
  { id: "1", name: "Welcome Message", content: "Hello {{name}}! Welcome to our service." },
  { id: "2", name: "Order Confirmation", content: "Hi {{name}}, your order #{{order_id}} has been confirmed." },
  { id: "3", name: "Appointment Reminder", content: "Just a reminder about your appointment on {{date}} at {{time}}." },
]

export default function SendMessagePage() {
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>(undefined)
  const [isSending, setIsSending] = useState(false)
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)

  const handleLoadTemplate = () => {
    if (selectedTemplateId) {
      const template = messageTemplates.find((t) => t.id === selectedTemplateId)
      if (template) {
        setMessage(template.content)
        setAlertInfo({
          type: "success",
          title: "Template Loaded",
          message: `Template "${template.name}" loaded into message area.`,
        })
      } else {
        setAlertInfo({ type: "error", title: "Error", message: "Selected template not found." })
      }
    } else {
      setAlertInfo({ type: "error", title: "No Template", message: "Please select a template first." })
    }
    setTimeout(() => setAlertInfo(null), 3000)
  }

  const handleSendMessage = async () => {
    if (!recipient || !message) {
      setAlertInfo({ type: "error", title: "Missing Info", message: "Please enter recipient and message." })
      setTimeout(() => setAlertInfo(null), 3000)
      return
    }
    setIsSending(true)
    setAlertInfo(null)
    // --- Placeholder for actual send message logic ---
    console.log("Sending message:", { recipient, message })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Simulate success/failure
    const success = Math.random() > 0.2
    if (success) {
      setAlertInfo({ type: "success", title: "Sent!", message: "Message sent successfully to " + recipient })
      setRecipient("")
      setMessage("")
    } else {
      setAlertInfo({ type: "error", title: "Failed!", message: "Could not send message. Please try again." })
    }
    // --- End of placeholder ---
    setIsSending(false)
    setTimeout(() => setAlertInfo(null), 4000)
  }

  const handleAttachMedia = () => {
    // Placeholder for file input logic
    console.log("Attach media clicked")
    setAlertInfo({
      type: "success",
      title: "Attach Media",
      message: "Media attachment functionality not yet implemented.",
    })
    setTimeout(() => setAlertInfo(null), 3000)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-fadeIn">
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-brandDarkBlue">Send New Message</h1>
        <p className="text-muted-foreground">Compose and send a WhatsApp message to your contacts.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow-md lg:col-span-2 animate-slideUp">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <MessageSquarePlus className="mr-2 h-5 w-5 text-brandDarkBlue" />
              Compose Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-gray-700">
                Recipient Number
              </Label>
              <Input
                id="recipient"
                placeholder="e.g., +12345678900 (with country code)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">
                Message
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="focus:ring-brandDarkBlue focus:border-brandDarkBlue pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 text-muted-foreground hover:text-brandDarkBlue"
                  onClick={() => console.log("Emoji picker clicked (not implemented)")}
                >
                  <Smile className="h-5 w-5" />
                  <span className="sr-only">Add Emoji</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button variant="outline" className="hover:bg-slate-100 group" onClick={handleAttachMedia}>
                <Paperclip className="mr-2 h-4 w-4 text-brandDarkBlue group-hover:text-brandDarkBlue/90" />
                Attach Media
              </Button>
              <Button
                className="bg-brandDarkBlue text-white hover:bg-opacity-90 w-full sm:w-auto group"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SendHorizonal className="ml-0 mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                )}
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md animate-slideUp delay-100">
          <CardHeader>
            <CardTitle className="text-gray-700">Message Templates</CardTitle>
            <CardDescription>Quickly use predefined message templates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
              <SelectTrigger className="w-full focus:ring-brandDarkBlue focus:border-brandDarkBlue">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {messageTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full hover:bg-slate-100" onClick={handleLoadTemplate}>
              Load Template
            </Button>
            <div className="mt-2 p-3 bg-slate-50 rounded-md border text-sm text-muted-foreground min-h-[80px]">
              <p className="whitespace-pre-wrap">
                {selectedTemplateId && messageTemplates.find((t) => t.id === selectedTemplateId)
                  ? messageTemplates.find((t) => t.id === selectedTemplateId)?.content
                  : "Template preview will appear here..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
