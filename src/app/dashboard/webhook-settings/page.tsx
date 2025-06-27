"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Link2, BellRing, ListChecks, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dummy webhook events
const webhookEvents = [
  { id: "message_received", label: "Message Received", description: "Triggered when a new message is received." },
  {
    id: "message_sent",
    label: "Message Sent",
    description: "Triggered after a message is successfully sent from your number.",
  },
  {
    id: "delivery_status_update",
    label: "Delivery Status Update",
    description: "Triggered when the delivery status of a sent message changes (e.g., delivered, read).",
  },
  {
    id: "device_connection_update",
    label: "Device Connection Update",
    description: "Triggered when your linked device connects or disconnects.",
  },
]

export default function WebhookSettingsPage() {
  const [webhookUrl, setWebhookUrl] = useState("https://api.example.com/whatsapp/webhook")
  const [enabledEvents, setEnabledEvents] = useState<Record<string, boolean>>({
    message_received: true,
    delivery_status_update: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null)

  const handleToggleEvent = (eventId: string) => {
    setEnabledEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveStatus(null)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Simulate success/error
    const success = Math.random() > 0.2 // 80% chance of success
    if (success) {
      setSaveStatus("success")
    } else {
      setSaveStatus("error")
    }
    setIsSaving(false)
    setTimeout(() => setSaveStatus(null), 4000) // Clear status message after 4 seconds
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-fadeIn">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-brandDarkBlue">Webhook Settings</h1>
        <p className="text-muted-foreground">
          Configure your webhook endpoint to receive real-time event notifications.
        </p>
      </header>

      <Card className="rounded-xl shadow-md animate-slideUp">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-700">
            <Link2 className="mr-2 h-5 w-5 text-brandDarkBlue" />
            Webhook Configuration
          </CardTitle>
          <CardDescription>Enter the URL where event data will be sent via POST requests.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl" className="text-gray-700">
              Webhook URL
            </Label>
            <Input
              id="webhookUrl"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-service.com/webhook-receiver"
              className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Ensure this endpoint is publicly accessible and can handle POST requests with JSON payloads.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-md animate-slideUp delay-100">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-700">
            <BellRing className="mr-2 h-5 w-5 text-brandDarkBlue" />
            Subscribed Events
          </CardTitle>
          <CardDescription>Choose which events you want to receive notifications for.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {webhookEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors duration-150"
            >
              <div>
                <Label htmlFor={event.id} className="font-medium text-gray-800 cursor-pointer">
                  {event.label}
                </Label>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </div>
              <Switch
                id={event.id}
                checked={!!enabledEvents[event.id]}
                onCheckedChange={() => handleToggleEvent(event.id)}
                className="data-[state=checked]:bg-brandDarkBlue"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end mt-8 animate-slideUp delay-200">
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-brandDarkBlue text-white hover:bg-opacity-90 min-w-[150px] group"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          )}
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      {saveStatus && (
        <Alert
          variant={saveStatus === "success" ? "default" : "destructive"}
          className={`mt-6 animate-fadeIn ${saveStatus === "success" ? "bg-green-50 border-green-300 text-green-700" : "bg-red-50 border-red-300 text-red-700"}`}
        >
          {saveStatus === "success" ? <ListChecks className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          <AlertTitle>{saveStatus === "success" ? "Success!" : "Error!"}</AlertTitle>
          <AlertDescription>
            {saveStatus === "success"
              ? "Webhook settings saved successfully."
              : "Failed to save webhook settings. Please try again."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
