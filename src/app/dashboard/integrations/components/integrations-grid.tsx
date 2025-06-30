import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Clock, Puzzle, RefreshCw, Settings, X } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSynced: string | null;
  settings: Record<string, boolean>;
}

interface IntegrationsGridProps {
  integrations: Integration[];
  onSync: (integrationId: string) => void;
  onDisconnect: (integrationId: string) => void;
  onReconnect: (integrationId: string) => void;
  onSaveSettings: (integrationId: string, settings: Record<string, boolean>) => void;
}

export function IntegrationsGrid({
  integrations,
  onSync,
  onDisconnect,
  onReconnect,
  onSaveSettings
}: IntegrationsGridProps) {
  const connectedIntegrations = integrations.filter(integration => integration.status !== "disconnected");
  const disconnectedIntegrations = integrations.filter(integration => integration.status === "disconnected");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {connectedIntegrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <div 
              className={`h-1.5 w-full ${
                integration.status === "connected" 
                  ? "bg-green-500" 
                  : integration.status === "error" 
                  ? "bg-red-500" 
                  : "bg-gray-500"
              }`}
            />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded overflow-hidden bg-muted flex items-center justify-center">
                    {integration.icon ? (
                      <img 
                        src={integration.icon} 
                        alt={integration.name} 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <Puzzle className="h-6 w-6 text-primary opacity-70" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={
                        integration.status === "connected"
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                          : integration.status === "error"
                          ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                          : ""
                      }
                    >
                      {integration.status === "connected" ? (
                        <>
                          <Check className="mr-1 h-3 w-3" /> Connected
                        </>
                      ) : integration.status === "error" ? (
                        <>
                          <X className="mr-1 h-3 w-3" /> Error
                        </>
                      ) : (
                        integration.status
                      )}
                    </Badge>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{integration.name} Settings</DialogTitle>
                      <DialogDescription>
                        Configure your integration settings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {Object.entries(integration.settings).map(([key, value]) => (
                        <div className="flex items-center justify-between" key={key}>
                          <Label htmlFor={`${integration.id}-${key}`} className="capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </Label>
                          <Switch 
                            id={`${integration.id}-${key}`} 
                            checked={value}
                            onCheckedChange={(checked) => {
                              const newSettings = { ...integration.settings, [key]: checked };
                              onSaveSettings(integration.id, newSettings);
                            }}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                      {integration.status === "error" && (
                        <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-md text-sm">
                          Authentication error. Please reconnect the integration.
                        </div>
                      )}
                    </div>
                    <DialogFooter className="gap-2">
                      {integration.status === "connected" ? (
                        <Button variant="destructive" onClick={() => onDisconnect(integration.id)}>
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => onReconnect(integration.id)}>
                          Reconnect
                        </Button>
                      )}
                      <Button onClick={() => onSaveSettings(integration.id, integration.settings)}>
                        Save Settings
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {integration.lastSynced ? (
                  <>Last synced {new Date(integration.lastSynced).toLocaleString()}</>
                ) : (
                  <>Never synced</>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSync(integration.id)}
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Sync Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {disconnectedIntegrations.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4 mt-8">Disconnected Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {disconnectedIntegrations.map((integration) => (
              <Card key={integration.id} className="bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-background flex items-center justify-center">
                        {integration.icon ? (
                          <img 
                            src={integration.icon} 
                            alt={integration.name} 
                            className="w-full h-full object-contain opacity-70" 
                          />
                        ) : (
                          <Puzzle className="h-6 w-6 text-primary opacity-50" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="outline">Disconnected</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-0">
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onReconnect(integration.id)}
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 