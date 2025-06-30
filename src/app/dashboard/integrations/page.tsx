import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Puzzle, 
  Search, 
  Check, 
  X, 
  ExternalLink, 
  Settings, 
  Plus,
  RefreshCw,
  ChevronRight,
  Clock,
  History,
  BarChart3,
  FileText
} from "lucide-react";

// Sample integrations data
const integrations = [
  {
    id: "int_1",
    name: "Shopify",
    description: "Connect your Shopify store to automate order notifications and customer support.",
    icon: "https://cdn.shopify.com/s/files/1/0533/2089/files/Shopify_logo_192x192.png",
    category: "ecommerce",
    status: "connected",
    lastSynced: "2023-07-05T10:30:00",
    settings: {
      notifications: true,
      autoReply: true,
      syncContacts: false,
    }
  },
  {
    id: "int_2",
    name: "Google Sheets",
    description: "Sync data to Google Sheets for reporting and analytics.",
    icon: "https://www.gstatic.com/images/branding/product/2x/sheets_2020q4_48dp.png",
    category: "productivity",
    status: "connected",
    lastSynced: "2023-07-06T14:15:00",
    settings: {
      autoSync: true,
      bidirectional: false,
    }
  },
  {
    id: "int_3",
    name: "Slack",
    description: "Send notifications and alerts to your Slack workspace.",
    icon: "https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_128.png",
    category: "communication",
    status: "disconnected",
    lastSynced: null,
    settings: {}
  },
  {
    id: "int_4",
    name: "Zapier",
    description: "Connect with thousands of apps via Zapier automation platform.",
    icon: "https://cdn.zapier.com/zapier/images/favicon.ico",
    category: "automation",
    status: "connected",
    lastSynced: "2023-07-06T09:45:00",
    settings: {
      webhooks: true,
    }
  },
  {
    id: "int_5",
    name: "HubSpot",
    description: "Sync contacts and conversations with your HubSpot CRM.",
    icon: "https://static.hsappstatic.net/StyleGuide/static-3.238/img/guide/HSLogo_16.svg",
    category: "crm",
    status: "error",
    lastSynced: "2023-07-04T16:20:00",
    settings: {
      syncContacts: true,
      syncMessages: true,
      autoUpdate: false,
    }
  },
  {
    id: "int_6",
    name: "Stripe",
    description: "Process payments and send payment links via WhatsApp.",
    icon: "https://stripe.com/img/v3/home/social.png",
    category: "payment",
    status: "disconnected",
    lastSynced: null,
    settings: {}
  },
];

// Sample available integrations
const availableIntegrations = [
  {
    id: "avail_1",
    name: "WordPress",
    description: "Connect to your WordPress site to create contact forms, notifications, and automate content publishing.",
    icon: "https://s.w.org/style/images/about/WordPress-logotype-standard.png",
    category: "cms",
    popular: true,
  },
  {
    id: "avail_2",
    name: "Monday.com",
    description: "Sync project data, tasks, and updates with your Monday boards.",
    icon: "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png",
    category: "project-management",
    popular: true,
  },
  {
    id: "avail_3",
    name: "Salesforce",
    description: "Bi-directional sync with Salesforce CRM for lead management and customer data.",
    icon: "https://c1.sfdcstatic.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg",
    category: "crm",
    popular: true,
  },
  {
    id: "avail_4",
    name: "Mailchimp",
    description: "Sync contacts with your Mailchimp email lists for marketing campaigns.",
    icon: "https://mailchimp.com/release/plums/cxp/images/apple-touch-icon-192.ce8f3e6d.png",
    category: "marketing",
    popular: false,
  },
  {
    id: "avail_5",
    name: "Intercom",
    description: "Connect your customer messaging platform for integrated support.",
    icon: "https://downloads.intercomcdn.com/i/o/355439/85bccccbd19d8ddd6533540d/1bb87e09835156c216321d1c05dae3a2.png",
    category: "support",
    popular: false,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect and manage third-party services
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Integration
        </Button>
      </div>

      <Tabs defaultValue="connected" className="mb-6">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.status !== "disconnected")
              .map((integration) => (
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
                            {integration.settings && Object.keys(integration.settings).map((key) => (
                              <div className="flex items-center justify-between" key={key}>
                                <Label htmlFor={`${integration.id}-${key}`} className="capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </Label>
                                <Switch 
                                  id={`${integration.id}-${key}`} 
                                  checked={integration.settings[key]} 
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
                              <Button variant="destructive">Disconnect</Button>
                            ) : (
                              <Button>Reconnect</Button>
                            )}
                            <Button>Save Settings</Button>
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
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Sync Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Disconnected Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {integrations
                .filter(integration => integration.status === "disconnected")
                .map((integration) => (
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
                    <CardFooter className="pt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-4">
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              className="pl-9 w-full max-w-lg"
            />
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Popular Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {availableIntegrations
              .filter(integration => integration.popular)
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
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
                          className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
          
          <h3 className="text-lg font-semibold mb-4">More Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {availableIntegrations
              .filter(integration => !integration.popular)
              .map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
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
                        <Badge variant="outline">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Activity</CardTitle>
              <CardDescription>
                Recent activities and sync events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <p className="font-medium">Google Sheets Sync Completed</p>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                        Success
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Successfully synced 156 contacts to Google Sheets
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Today, 14:15
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                      <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <p className="font-medium">HubSpot Authentication Failed</p>
                      <Badge className="ml-2 bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400">
                        Error
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      OAuth token expired. Please reconnect the integration.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Today, 10:30
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <p className="font-medium">Zapier Webhook Received</p>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                        Success
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Processed new order notification from Shopify via Zapier
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Today, 09:45
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <p className="font-medium">Shopify Integration Connected</p>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                        Success
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Successfully authenticated and connected to Shopify store
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yesterday, 16:20
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">
                <History className="mr-2 h-4 w-4" /> View Full History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="border-t pt-6 mt-6">
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Message Received</p>
                    <p className="text-sm text-muted-foreground">
                      Triggered when a new message is received
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Message Status Update</p>
                    <p className="text-sm text-muted-foreground">
                      Triggered when a message status changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Activity</p>
                    <p className="text-sm text-muted-foreground">
                      Triggered on user login/logout events
                    </p>
                  </div>
                  <Switch />
                </div>
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
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Generate New
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Input 
                      value="••••••••••••••••••••••••" 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button variant="ghost" size="sm" className="ml-2">
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Last used: Today, 11:30 AM
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="flex justify-between w-full">
                    <span className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" /> REST API Docs
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex justify-between w-full">
                    <span className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" /> Analytics API
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button className="w-full">
                Manage API Keys
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 