import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Copy, RefreshCw, Shield, Key, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WebhookSecurityProps {
  onRegenerateSecret?: () => void
}

export function WebhookSecurity({ onRegenerateSecret }: WebhookSecurityProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Webhook Signatures
          </CardTitle>
          <CardDescription>
            Verify webhook requests with signatures
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Signing Secret</h3>
                <p className="text-sm text-muted-foreground">
                  This secret is used to generate signatures for your webhooks
                </p>
              </div>
              <Button onClick={onRegenerateSecret} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input
                readOnly
                type="password"
                value="whsec_8f1b73e4c0a54a70b928e3a95b62d94b"
              />
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 p-3 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="text-amber-600 dark:text-amber-500 h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-400">
                    Warning
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Keep this key secret. Anyone with this key can create valid webhook signatures.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Signature Verification</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Switch id="require-signatures" defaultChecked />
                <Label htmlFor="require-signatures">Require signature verification</Label>
              </div>
              <p className="text-sm text-muted-foreground pl-7">
                Reject webhook requests that don't have a valid signature
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Signature Header Name</Label>
              <Input 
                defaultValue="X-Signature-256" 
                placeholder="Header name" 
              />
              <p className="text-sm text-muted-foreground">
                Header used to transmit the signature in webhook requests
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Security Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>IP Allowlist</CardTitle>
          <CardDescription>
            Restrict webhook delivery to specific IP addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="enable-ip-allowlist" />
            <Label htmlFor="enable-ip-allowlist">Enable IP allowlist</Label>
          </div>
          
          <div>
            <Label htmlFor="ip-addresses">Allowed IP Addresses</Label>
            <Textarea 
              id="ip-addresses"
              placeholder="Enter IP addresses, one per line"
              className="h-32 mt-2"
              disabled
            />
            <p className="text-sm text-muted-foreground mt-2">
              Only requests from these IPs will be accepted. Leave empty to allow all IPs.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>Save IP Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 