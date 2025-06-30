import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Save, Plus, BarChart3, Clock, AlertCircle, Users, ArrowUpDown, Edit, Trash2, RefreshCw, Activity, Gauge } from "lucide-react";

// Sample data for rate limits
const rateLimits = [
  {
    id: "limit_1",
    name: "Default Rate",
    limitType: "global",
    requestsPerMinute: 60,
    requestsPerHour: 3000,
    requestsPerDay: 50000,
    applyTo: "all",
  },
  {
    id: "limit_2",
    name: "Free Tier",
    limitType: "plan",
    requestsPerMinute: 30,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
    applyTo: "plan:free",
  },
  {
    id: "limit_3",
    name: "Basic Tier",
    limitType: "plan",
    requestsPerMinute: 60,
    requestsPerHour: 3000,
    requestsPerDay: 50000,
    applyTo: "plan:basic",
  },
  {
    id: "limit_4",
    name: "Premium Tier",
    limitType: "plan",
    requestsPerMinute: 120,
    requestsPerHour: 6000,
    requestsPerDay: 100000,
    applyTo: "plan:premium",
  },
  {
    id: "limit_5",
    name: "Marketing Integration",
    limitType: "api_key",
    requestsPerMinute: 30,
    requestsPerHour: 1200,
    requestsPerDay: 20000,
    applyTo: "key:key_24680",
  },
];

// Sample data for usage
const usageData = [
  { time: "00:00", requests: 312 },
  { time: "02:00", requests: 156 },
  { time: "04:00", requests: 98 },
  { time: "06:00", requests: 205 },
  { time: "08:00", requests: 649 },
  { time: "10:00", requests: 1200 },
  { time: "12:00", requests: 1550 },
  { time: "14:00", requests: 1798 },
  { time: "16:00", requests: 1680 },
  { time: "18:00", requests: 1420 },
  { time: "20:00", requests: 970 },
  { time: "22:00", requests: 450 },
];

export default function RateLimitingPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rate Limiting</h1>
          <p className="text-muted-foreground">
            Konfigurasi batas penggunaan API per pengguna atau kunci API
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Rate Limit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Rate Limit</DialogTitle>
              <DialogDescription>
                Configure rate limiting for users or specific API keys.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="limit-name">Name</Label>
                <Input
                  id="limit-name"
                  placeholder="e.g. Custom API Limit"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="limit-type">Limit Type</Label>
                <Select>
                  <SelectTrigger id="limit-type" className="mt-1">
                    <SelectValue placeholder="Select limit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global (Default)</SelectItem>
                    <SelectItem value="plan">Subscription Plan</SelectItem>
                    <SelectItem value="api_key">Specific API Key</SelectItem>
                    <SelectItem value="ip">IP Address</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="apply-to">Apply To</Label>
                <Select>
                  <SelectTrigger id="apply-to" className="mt-1">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users & Keys</SelectItem>
                    <SelectItem value="plan:free">Free Plan</SelectItem>
                    <SelectItem value="plan:basic">Basic Plan</SelectItem>
                    <SelectItem value="plan:premium">Premium Plan</SelectItem>
                    <SelectItem value="key:key_12345">Production API Key</SelectItem>
                    <SelectItem value="key:key_67890">Development API Key</SelectItem>
                    <SelectItem value="key:key_24680">Marketing Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="requests-per-minute">
                  Requests per Minute: <span className="font-bold">60</span>
                </Label>
                <Slider
                  id="requests-per-minute"
                  defaultValue={[60]}
                  max={500}
                  step={10}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="requests-per-hour">
                  Requests per Hour: <span className="font-bold">3,000</span>
                </Label>
                <Slider
                  id="requests-per-hour"
                  defaultValue={[3000]}
                  max={10000}
                  step={100}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="requests-per-day">
                  Requests per Day: <span className="font-bold">50,000</span>
                </Label>
                <Slider
                  id="requests-per-day"
                  defaultValue={[50000]}
                  max={200000}
                  step={1000}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enforce-immediately" />
                <Label htmlFor="enforce-immediately">Enforce immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save Rate Limit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="mr-2 h-4 w-4 text-primary" /> API Requests Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,560</div>
            <p className="text-xs text-muted-foreground">
              49.1% of daily limit
            </p>
            <Progress value={49.1} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Gauge className="mr-2 h-4 w-4 text-primary" /> Current Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 req/min</div>
            <p className="text-xs text-muted-foreground">
              70% of rate limit
            </p>
            <Progress value={70} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-primary" /> Throttled Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +23 in the last hour
            </p>
            <Progress value={15.6} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>API Usage Over 24 Hours</CardTitle>
            <CardDescription>
              Requests per 2-hour interval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage By Plan</CardTitle>
            <CardDescription>
              API requests by subscription tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">Premium Plans</div>
                  <div className="text-sm text-muted-foreground">
                    12,450 / 100,000
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: "12.45%" }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">Basic Plans</div>
                  <div className="text-sm text-muted-foreground">
                    8,930 / 50,000
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "17.86%" }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">Free Plans</div>
                  <div className="text-sm text-muted-foreground">
                    3,180 / 10,000
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div
                    className="h-2 bg-yellow-500 rounded-full"
                    style={{ width: "31.8%" }}
                  ></div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Throttled Requests</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold">23</div>
                    <div className="text-xs text-muted-foreground">Premium</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">48</div>
                    <div className="text-xs text-muted-foreground">Basic</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">85</div>
                    <div className="text-xs text-muted-foreground">Free</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Rate Limits</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="plan">By Plan</TabsTrigger>
          <TabsTrigger value="api_key">By API Key</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <RateLimitsTable limits={rateLimits} />
        </TabsContent>
        
        <TabsContent value="global" className="mt-4">
          <RateLimitsTable limits={rateLimits.filter(limit => limit.limitType === 'global')} />
        </TabsContent>
        
        <TabsContent value="plan" className="mt-4">
          <RateLimitsTable limits={rateLimits.filter(limit => limit.limitType === 'plan')} />
        </TabsContent>
        
        <TabsContent value="api_key" className="mt-4">
          <RateLimitsTable limits={rateLimits.filter(limit => limit.limitType === 'api_key')} />
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Rate Limiting Best Practices</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2">
            Properly configured rate limits help maintain system stability and prevent abuse.
            Consider the following best practices:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Set stricter limits for anonymous or free-tier users</li>
            <li>Configure separate limits for read and write operations</li>
            <li>Implement gradual backoff responses for clients exceeding limits</li>
            <li>Monitor rate limit usage to identify potential issues or abuse</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}

function RateLimitsTable({ limits }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>Rate Limits</CardTitle>
        <CardDescription>Manage and configure API rate limits.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Applies To</TableHead>
              <TableHead className="text-right">Per Minute</TableHead>
              <TableHead className="text-right">Per Hour</TableHead>
              <TableHead className="text-right">Per Day</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {limits.map((limit) => (
              <TableRow key={limit.id}>
                <TableCell>
                  <div className="font-medium">{limit.name}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      limit.limitType === "global"
                        ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30"
                        : limit.limitType === "plan"
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30"
                        : "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30"
                    }
                  >
                    {limit.limitType === "global" ? "Global" : 
                      limit.limitType === "plan" ? "Plan" : 
                      limit.limitType === "api_key" ? "API Key" : 
                      limit.limitType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {limit.applyTo === "all" ? (
                    "All Users & Keys"
                  ) : limit.applyTo.startsWith("plan:") ? (
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1.5 text-muted-foreground" />
                      {limit.applyTo.replace("plan:", "").charAt(0).toUpperCase() + limit.applyTo.replace("plan:", "").slice(1)} Plan
                    </div>
                  ) : limit.applyTo.startsWith("key:") ? (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1.5 text-muted-foreground" />
                      {limit.name}
                    </div>
                  ) : (
                    limit.applyTo
                  )}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {limit.requestsPerMinute.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {limit.requestsPerHour.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {limit.requestsPerDay.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {limit.limitType !== "global" && (
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {limits.length} rate {limits.length === 1 ? "limit" : "limits"}
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </CardFooter>
    </Card>
  );
} 