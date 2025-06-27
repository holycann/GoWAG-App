"use client" // If using hooks like useState

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WhatsAppService, { WhatsAppSession } from "@/services/whatsapp-service"

interface QRCardProps {
  onCreateSession?: (name: string) => Promise<WhatsAppSession | null>
  onConnectSuccess?: (session: WhatsAppSession) => void
}

export function QRCard({ onCreateSession, onConnectSuccess }: QRCardProps) {
  const [sessionName, setSessionName] = useState("My WhatsApp")
  const [activeSession, setActiveSession] = useState<WhatsAppSession | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const handleConnect = async () => {
    if (!sessionName.trim()) return;
    
    setIsConnecting(true);
    
    try {
      // Create a new session
      const session = onCreateSession ? 
        await onCreateSession(sessionName) : 
        await WhatsAppService.createSession(sessionName);
      
      if (!session) {
        setIsConnecting(false);
        return;
      }
      
      setActiveSession(session);
      
      // Get QR code for the session
      const qrCode = await WhatsAppService.getSessionQR(session.id);
      setQrCodeUrl(qrCode);
      
      // Start polling for connection status
      pollingRef.current = setInterval(async () => {
        try {
          const status = await WhatsAppService.checkSessionStatus(session.id);
          
          if (status.status === 'connected') {
            // Connection successful
            if (pollingRef.current) clearInterval(pollingRef.current);
            
            // Get updated session info
            const updatedSession = await WhatsAppService.getSession(session.id);
            setActiveSession(updatedSession);
            
            onConnectSuccess?.(updatedSession);
          }
        } catch (error) {
          console.error('Error checking session status:', error);
        }
      }, 3000);
    } catch (error) {
      console.error('Error connecting device:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCancelConnect = async () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
    
    // If we have an active session that's not connected, delete it
    if (activeSession && activeSession.status !== 'connected') {
      try {
        await WhatsAppService.deleteSession(activeSession.id);
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
    
    setQrCodeUrl(null);
    setActiveSession(null);
    setIsConnecting(false);
  }

  const handleDisconnect = async () => {
    if (!activeSession) return;
    
    setIsConnecting(true);
    
    try {
      await WhatsAppService.logoutSession(activeSession.id);
      setActiveSession(null);
      setQrCodeUrl(null);
    } catch (error) {
      console.error('Error disconnecting session:', error);
    } finally {
      setIsConnecting(false);
    }
  }

  const isConnected = activeSession?.status === 'connected';

  return (
    <Card className="rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-gray-700">
          {isConnected ? (
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500 mr-2" />
          )}
          Device Connection Status
        </CardTitle>
        <CardDescription>
          {isConnected ? "Your device is connected and online." : "Your device is currently offline."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4 min-h-[280px] justify-center">
        {isConnected ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
            <p className="text-lg font-semibold text-green-600">{activeSession?.name || "Device"} Online</p>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600 w-full"
              disabled={isConnecting}
            >
              {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Disconnect Device
            </Button>
          </>
        ) : (
          <>
            {qrCodeUrl ? (
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={`data:image/png;base64,${qrCodeUrl}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg border"
                />
                <p className="text-sm text-muted-foreground text-center">Scan this QR code with your WhatsApp.</p>
                <Button
                  onClick={handleCancelConnect}
                  variant="outline"
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-full"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionName">Device Name</Label>
                  <Input 
                    id="sessionName" 
                    value={sessionName} 
                    onChange={(e) => setSessionName(e.target.value)}
                    placeholder="My WhatsApp" 
                    disabled={isConnecting}
                  />
                </div>
                <Button
                  onClick={handleConnect}
                  className="bg-brandDarkBlue text-white hover:bg-opacity-90 w-full"
                  disabled={isConnecting || !sessionName.trim()}
                >
                  {isConnecting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <QrCode className="mr-2 h-5 w-5" />
                  )}
                  {isConnecting ? "Generating QR..." : "Connect via QR"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
