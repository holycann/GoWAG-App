import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BarChart3, ChevronRight, ExternalLink, FileText } from "lucide-react";

interface WebhookSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface IntegrationsToolsProps {
  webhookSettings: WebhookSetting[];
  apiKey: string;
  lastUsed: string;
  onGenerateApiKey: () => void;
  onCopyApiKey: () => void;
  onWebhookToggle: (webhookId: string, enabled: boolean) => void;
  onManageApiKeys: () => void;
  onViewDocs: (docType: 'rest' | 'analytics') => void;
}

export function IntegrationsTools({
  webhookSettings,
  apiKey,
  lastUsed,
  onGenerateApiKey,
  onCopyApiKey,
  onWebhookToggle,
  onManageApiKeys,
  onViewDocs
}: IntegrationsToolsProps) {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">API & Developer Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>
              Set up and manage webhooks for automated events
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <p className="text-sm text-muted-foreground mb-4">
              Webhooks allow you to receive real-time notifications when events occur in your account.
            </p>
            <div className="space-y-4">
              {webhookSettings.map((webhook) => (
                <div key={webhook.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{webhook.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {webhook.description}
                    </p>
                  </div>
                  <Switch 
                    checked={webhook.enabled}
                    onCheckedChange={(checked) => onWebhookToggle(webhook.id, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" /> Webhook Documentation
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API References</CardTitle>
            <CardDescription>
              Access API keys and documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Label>API Key</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={onGenerateApiKey}
                  >
                    Generate New
                  </Button>
                </div>
                <div className="flex items-center">
                  <Input 
                    value={apiKey} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2"
                    onClick={onCopyApiKey}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs mt-1 text-muted-foreground">
                  Last used: {lastUsed}
                </p>
              </div>

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="flex justify-between w-full"
                  onClick={() => onViewDocs('rest')}
                >
                  <span className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" /> REST API Docs
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-between w-full"
                  onClick={() => onViewDocs('analytics')}
                >
                  <span className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" /> Analytics API
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full" onClick={onManageApiKeys}>
              Manage API Keys
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
} 