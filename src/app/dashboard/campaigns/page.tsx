import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { 
  MegaphoneIcon, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  PlayCircle,
  PauseCircle,
  ChevronRight,
  Plus,
  BarChart3,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Users
} from "lucide-react";

// Sample campaigns data
const campaigns = [
  {
    id: "camp_1",
    name: "July Product Launch",
    description: "Campaign for new product launch",
    status: "active",
    type: "promotional",
    startDate: "2023-07-01T00:00:00",
    endDate: "2023-07-15T00:00:00",
    targetGroups: ["All Customers", "VIP Customers"],
    targetCount: 60,
    sentCount: 54,
    deliveredCount: 50,
    readCount: 42,
    responseCount: 12,
    stats: {
      clickRate: 32,
      openRate: 78,
      conversionRate: 15,
    }
  },
  {
    id: "camp_2",
    name: "Customer Feedback Survey",
    description: "Survey to collect customer feedback",
    status: "scheduled",
    type: "survey",
    startDate: "2023-07-10T09:00:00",
    endDate: "2023-07-20T00:00:00",
    targetGroups: ["All Customers"],
    targetCount: 48,
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    responseCount: 0,
    stats: {
      clickRate: 0,
      openRate: 0,
      conversionRate: 0,
    }
  },
  {
    id: "camp_3",
    name: "End of Season Sale",
    description: "Promotion for end of season sale",
    status: "draft",
    type: "promotional",
    startDate: "2023-07-25T00:00:00",
    endDate: "2023-08-10T00:00:00",
    targetGroups: ["All Customers", "Inactive Customers"],
    targetCount: 75,
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    responseCount: 0,
    stats: {
      clickRate: 0,
      openRate: 0,
      conversionRate: 0,
    }
  },
  {
    id: "camp_4",
    name: "Customer Re-engagement",
    description: "Campaign to re-engage inactive customers",
    status: "paused",
    type: "re-engagement",
    startDate: "2023-06-15T00:00:00",
    endDate: "2023-07-15T00:00:00",
    targetGroups: ["Inactive Customers"],
    targetCount: 27,
    sentCount: 15,
    deliveredCount: 14,
    readCount: 8,
    responseCount: 3,
    stats: {
      clickRate: 18,
      openRate: 57,
      conversionRate: 12,
    }
  },
  {
    id: "camp_5",
    name: "Monthly Newsletter",
    description: "July monthly newsletter",
    status: "completed",
    type: "newsletter",
    startDate: "2023-07-01T10:00:00",
    endDate: "2023-07-01T10:00:00",
    targetGroups: ["Newsletter Subscribers"],
    targetCount: 156,
    sentCount: 156,
    deliveredCount: 149,
    readCount: 103,
    responseCount: 24,
    stats: {
      clickRate: 45,
      openRate: 69,
      conversionRate: 22,
    }
  },
];

// Sample performance data
const performanceData = [
  { name: "Jun 25", messages: 125, responses: 42 },
  { name: "Jun 26", messages: 98, responses: 28 },
  { name: "Jun 27", messages: 156, responses: 51 },
  { name: "Jun 28", messages: 165, responses: 48 },
  { name: "Jun 29", messages: 180, responses: 61 },
  { name: "Jun 30", messages: 210, responses: 76 },
  { name: "Jul 01", messages: 245, responses: 89 },
  { name: "Jul 02", messages: 189, responses: 68 },
  { name: "Jul 03", messages: 175, responses: 54 },
  { name: "Jul 04", messages: 132, responses: 42 },
  { name: "Jul 05", messages: 146, responses: 51 },
  { name: "Jul 06", messages: 158, responses: 54 },
  { name: "Jul 07", messages: 178, responses: 62 },
];

export default function CampaignsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage marketing campaigns and broadcasts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MegaphoneIcon className="mr-2 h-4 w-4 text-primary" /> Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-primary" /> Messages Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, campaign) => sum + campaign.sentCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" /> Total Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((sum, campaign) => sum + campaign.targetCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-primary" /> Avg Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (campaigns.reduce((sum, camp) => sum + (camp.responseCount / (camp.sentCount || 1) * 100), 0) / 
                campaigns.length)
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              All campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Message delivery and response rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Messages Sent"
                />
                <Line
                  type="monotone"
                  dataKey="responses"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Responses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Types</CardTitle>
            <CardDescription>
              Distribution by campaign type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[
                { name: "Promotional", count: campaigns.filter(c => c.type === "promotional").length },
                { name: "Newsletter", count: campaigns.filter(c => c.type === "newsletter").length },
                { name: "Survey", count: campaigns.filter(c => c.type === "survey").length },
                { name: "Re-engagement", count: campaigns.filter(c => c.type === "re-engagement").length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Campaigns</span>
                <span className="font-medium">{campaigns.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Open Rate</span>
                <span className="font-medium">
                  {Math.round(
                    campaigns.reduce((sum, camp) => sum + camp.stats.openRate, 0) / campaigns.length
                  )}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Conversion</span>
                <span className="font-medium">
                  {Math.round(
                    campaigns.reduce((sum, camp) => sum + camp.stats.conversionRate, 0) / campaigns.length
                  )}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <CampaignsTable campaigns={campaigns} />
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <CampaignsTable campaigns={campaigns.filter(c => c.status === "active")} />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-4">
          <CampaignsTable campaigns={campaigns.filter(c => c.status === "scheduled")} />
        </TabsContent>
        
        <TabsContent value="draft" className="mt-4">
          <CampaignsTable campaigns={campaigns.filter(c => c.status === "draft")} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <CampaignsTable campaigns={campaigns.filter(c => c.status === "completed")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CampaignsTable({ campaigns }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign List</CardTitle>
        <CardDescription>
          View and manage your marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {campaign.description}
                    </div>
                    <Badge 
                      variant="outline" 
                      className="mt-1"
                    >
                      {campaign.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {campaign.status === "active" ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                      <PlayCircle className="mr-1 h-3 w-3" /> Active
                    </Badge>
                  ) : campaign.status === "scheduled" ? (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                      <Clock className="mr-1 h-3 w-3" /> Scheduled
                    </Badge>
                  ) : campaign.status === "paused" ? (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <PauseCircle className="mr-1 h-3 w-3" /> Paused
                    </Badge>
                  ) : campaign.status === "draft" ? (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400">
                      Draft
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400">
                      <CheckCircle className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {campaign.targetGroups.map((group, index) => (
                        <Badge key={index} variant="outline">
                          {group}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.targetCount} recipients
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(campaign.startDate).toLocaleDateString()} {campaign.status !== "completed" && "to"}
                  </div>
                  {campaign.status !== "completed" && (
                    <div className="text-sm">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {campaign.status === "draft" ? (
                    <span className="text-sm text-muted-foreground">Not started</span>
                  ) : campaign.status === "scheduled" ? (
                    <span className="text-sm text-muted-foreground">Pending</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-muted-foreground">Sent:</span>
                        <span className="text-xs font-medium">{campaign.sentCount}/{campaign.targetCount}</span>
                      </div>
                      <Progress 
                        value={Math.round((campaign.sentCount / campaign.targetCount) * 100)} 
                        className="h-1.5"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-muted-foreground">Read:</span>
                        <span className="text-xs font-medium">
                          {Math.round((campaign.readCount / campaign.sentCount) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>View Analytics</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Campaign</span>
                      </DropdownMenuItem>
                      {campaign.status === "active" && (
                        <DropdownMenuItem>
                          <PauseCircle className="mr-2 h-4 w-4" />
                          <span>Pause Campaign</span>
                        </DropdownMenuItem>
                      )}
                      {campaign.status === "paused" && (
                        <DropdownMenuItem>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          <span>Resume Campaign</span>
                        </DropdownMenuItem>
                      )}
                      {campaign.status === "draft" && (
                        <DropdownMenuItem>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          <span>Activate Campaign</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Campaign</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {campaigns.length} campaigns
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 