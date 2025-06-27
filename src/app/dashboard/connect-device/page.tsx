"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { List, Smartphone, Trash2, Wifi, WifiOff, ShieldAlert, Loader2 } from "lucide-react"
import { QRCard } from "../components/qr-card"
import { PageAlert } from "../components/page-alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import WhatsAppService, { WhatsAppSession } from "@/services/whatsapp-service"

export default function ConnectDevicePage() {
  const [sessions, setSessions] = useState<WhatsAppSession[]>([])
  const [loading, setLoading] = useState(true)
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)
  const [sessionToRemove, setSessionToRemove] = useState<WhatsAppSession | null>(null)

  // Fetch sessions on load
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const sessions = await WhatsAppService.getSessions()
        setSessions(sessions)
      } catch (error) {
        console.error("Failed to fetch WhatsApp sessions:", error)
        setAlertInfo({
          type: "error",
          title: "Error",
          message: "Failed to load connected devices. Please try again."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const handleRemoveSession = async (sessionId: string) => {
    if (!sessionToRemove) return

    try {
      await WhatsAppService.deleteSession(sessionId)
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))
      setAlertInfo({ 
        type: "success", 
        title: "Success!", 
        message: `Device ${sessionToRemove.name} removed successfully.` 
      })
    } catch (error) {
      console.error("Failed to remove device:", error)
      setAlertInfo({ 
        type: "error", 
        title: "Error", 
        message: "Failed to remove device. Please try again." 
      })
    } finally {
      setSessionToRemove(null) // Close dialog
      setTimeout(() => setAlertInfo(null), 3000)
    }
  }

  const handleCreateSession = async (name: string) => {
    try {
      const newSession = await WhatsAppService.createSession(name)
      setSessions([...sessions, newSession])
      return newSession
    } catch (error) {
      console.error("Failed to create session:", error)
      setAlertInfo({ 
        type: "error", 
        title: "Error", 
        message: "Failed to create new session. Please try again." 
      })
      return null
    }
  }

  const onQRConnectSuccess = (session: WhatsAppSession) => {
    setAlertInfo({ 
      type: "success", 
      title: "Connected!", 
      message: `Device ${session.name} connected successfully via QR.` 
    })
    
    // Refresh session list
    WhatsAppService.getSessions().then(setSessions)
    
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
        <h1 className="text-3xl font-bold text-brandDarkBlue">Connect Your Device</h1>
        <p className="text-muted-foreground">Manage your connected WhatsApp devices and link new ones.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <QRCard onCreateSession={handleCreateSession} onConnectSuccess={onQRConnectSuccess} />
        </div>

        <Card className="rounded-xl shadow-md lg:col-span-2 animate-slideUp">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <List className="mr-2 h-5 w-5 text-brandDarkBlue" />
              Connected Devices
            </CardTitle>
            <CardDescription>View and manage your currently linked devices.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-brandDarkBlue" />
              </div>
            ) : sessions.length > 0 ? (
              <ul className="space-y-4">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200 bg-white"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <Smartphone className="mr-3 h-8 w-8 text-brandDarkBlue" />
                      <div>
                        <p className="font-semibold text-gray-800">{session.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {session.lastActivity || "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.status === "connected" ? (
                        <span className="text-xs inline-flex items-center font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                          <Wifi className="mr-1 h-3 w-3" /> Online
                        </span>
                      ) : (
                        <span className="text-xs inline-flex items-center font-semibold px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                          <WifiOff className="mr-1 h-3 w-3" /> {session.status === "connecting" ? "Connecting" : "Offline"}
                        </span>
                      )}
                      <AlertDialog
                        open={!!sessionToRemove && sessionToRemove.id === session.id}
                        onOpenChange={(isOpen) => !isOpen && setSessionToRemove(null)}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:bg-red-100"
                            onClick={() => setSessionToRemove(session)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove device</span>
                          </Button>
                        </AlertDialogTrigger>
                        {sessionToRemove && sessionToRemove.id === session.id && (
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center">
                                <ShieldAlert className="mr-2 h-5 w-5 text-red-500" />
                                Confirm Removal
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove the device "<strong>{sessionToRemove.name}</strong>"?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setSessionToRemove(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveSession(session.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Remove Device
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        )}
                      </AlertDialog>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No devices connected yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-md animate-slideUp delay-100">
        <CardHeader>
          <CardTitle className="text-gray-700">How to Connect</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ol>
            <li>Open WhatsApp on your phone.</li>
            <li>
              Tap <strong>Menu</strong> (Android) or <strong>Settings</strong> (iPhone).
            </li>
            <li>
              Select <strong>Linked Devices</strong>.
            </li>
            <li>
              Tap <strong>Link a Device</strong>.
            </li>
            <li>Scan the QR code displayed on this page using your phone.</li>
          </ol>
          <p>Ensure your phone has an active internet connection during the process.</p>
        </CardContent>
      </Card>
    </div>
  )
}
