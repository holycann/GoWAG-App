"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "recharts"
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
} from "lucide-react"

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
]

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
]

// CampaignsHeader Component
function CampaignsHeader({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground">
          Create and manage marketing campaigns and broadcasts
        </p>
      </div>
      <Button onClick={onCreateCampaign}>
        <Plus className="mr-2 h-4 w-4" /> New Campaign
      </Button>
    </div>
  )
}

// CampaignStats Component
function CampaignStats({ campaigns }: { campaigns: any[] }) {
  return (
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
  )
}

// CampaignPerformanceChart Component
function CampaignPerformanceChart({ data }: { data: any[] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>
          Message delivery and response rates over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="messages" stroke="#8884d8" name="Messages Sent" />
              <Line type="monotone" dataKey="responses" stroke="#82ca9d" name="Responses" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// CampaignsTable Component
function CampaignsTable({ 
  campaigns, 
  onEditCampaign,
  onDeleteCampaign,
  onPauseCampaign,
  onResumeCampaign,
  onViewCampaign
}: { 
  campaigns: any[],
  onEditCampaign: (id: string) => void,
  onDeleteCampaign: (id: string) => void,
  onPauseCampaign: (id: string) => void,
  onResumeCampaign: (id: string) => void,
  onViewCampaign: (id: string) => void
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
      case "scheduled":
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Scheduled</Badge>
      case "paused":
        return <Badge variant="secondary">Paused</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "completed":
        return <Badge variant="secondary" className="bg-slate-100 text-slate-800">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Target</TableHead>
            <TableHead className="hidden md:table-cell">Start Date</TableHead>
            <TableHead className="hidden md:table-cell">End Date</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">
                <div>{campaign.name}</div>
                <div className="text-sm text-muted-foreground hidden md:block">{campaign.description}</div>
              </TableCell>
              <TableCell>{getStatusBadge(campaign.status)}</TableCell>
              <TableCell className="capitalize">{campaign.type}</TableCell>
              <TableCell className="hidden md:table-cell">{campaign.targetCount}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(campaign.startDate)}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(campaign.endDate)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={campaign.sentCount > 0 ? (campaign.sentCount / campaign.targetCount) * 100 : 0} 
                    className="h-2"
                  />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {campaign.sentCount > 0 ? Math.round((campaign.sentCount / campaign.targetCount) * 100) : 0}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewCampaign(campaign.id)}>
                      <ChevronRight className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditCampaign(campaign.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "active" ? (
                      <DropdownMenuItem onClick={() => onPauseCampaign(campaign.id)}>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause Campaign
                      </DropdownMenuItem>
                    ) : campaign.status === "paused" || campaign.status === "draft" ? (
                      <DropdownMenuItem onClick={() => onResumeCampaign(campaign.id)}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {campaign.status === "paused" ? "Resume Campaign" : "Start Campaign"}
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDeleteCampaign(campaign.id)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// CampaignTabs Component
function CampaignTabs({ 
  campaigns,
  onEditCampaign,
  onDeleteCampaign,
  onPauseCampaign,
  onResumeCampaign,
  onViewCampaign
}: { 
  campaigns: any[],
  onEditCampaign: (id: string) => void,
  onDeleteCampaign: (id: string) => void,
  onPauseCampaign: (id: string) => void,
  onResumeCampaign: (id: string) => void,
  onViewCampaign: (id: string) => void
}) {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList>
        <TabsTrigger value="all">All Campaigns</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        <TabsTrigger value="draft">Drafts</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <CampaignsTable 
          campaigns={campaigns}
          onEditCampaign={onEditCampaign}
          onDeleteCampaign={onDeleteCampaign}
          onPauseCampaign={onPauseCampaign}
          onResumeCampaign={onResumeCampaign}
          onViewCampaign={onViewCampaign}
        />
      </TabsContent>
      
      <TabsContent value="active" className="mt-4">
        <CampaignsTable 
          campaigns={campaigns.filter(c => c.status === "active")}
          onEditCampaign={onEditCampaign}
          onDeleteCampaign={onDeleteCampaign}
          onPauseCampaign={onPauseCampaign}
          onResumeCampaign={onResumeCampaign}
          onViewCampaign={onViewCampaign}
        />
      </TabsContent>
      
      <TabsContent value="scheduled" className="mt-4">
        <CampaignsTable 
          campaigns={campaigns.filter(c => c.status === "scheduled")}
          onEditCampaign={onEditCampaign}
          onDeleteCampaign={onDeleteCampaign}
          onPauseCampaign={onPauseCampaign}
          onResumeCampaign={onResumeCampaign}
          onViewCampaign={onViewCampaign}
        />
      </TabsContent>
      
      <TabsContent value="draft" className="mt-4">
        <CampaignsTable 
          campaigns={campaigns.filter(c => c.status === "draft")}
          onEditCampaign={onEditCampaign}
          onDeleteCampaign={onDeleteCampaign}
          onPauseCampaign={onPauseCampaign}
          onResumeCampaign={onResumeCampaign}
          onViewCampaign={onViewCampaign}
        />
      </TabsContent>
      
      <TabsContent value="completed" className="mt-4">
        <CampaignsTable 
          campaigns={campaigns.filter(c => c.status === "completed")}
          onEditCampaign={onEditCampaign}
          onDeleteCampaign={onDeleteCampaign}
          onPauseCampaign={onPauseCampaign}
          onResumeCampaign={onResumeCampaign}
          onViewCampaign={onViewCampaign}
        />
      </TabsContent>
    </Tabs>
  )
}

export default function CampaignsPage() {
  // Event handlers
  const handleCreateCampaign = () => {
    console.log("Creating new campaign")
  }
  
  const handleEditCampaign = (id: string) => {
    console.log("Editing campaign:", id)
  }
  
  const handleDeleteCampaign = (id: string) => {
    console.log("Deleting campaign:", id)
  }
  
  const handlePauseCampaign = (id: string) => {
    console.log("Pausing campaign:", id)
  }
  
  const handleResumeCampaign = (id: string) => {
    console.log("Resuming campaign:", id)
  }
  
  const handleViewCampaign = (id: string) => {
    console.log("Viewing campaign details:", id)
  }

  return (
    <div className="container mx-auto p-6">
      <CampaignsHeader onCreateCampaign={handleCreateCampaign} />
      
      <CampaignStats campaigns={campaigns} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CampaignPerformanceChart data={performanceData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Metrics</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Delivery Rate</div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (campaigns.reduce((sum, camp) => sum + camp.deliveredCount, 0) / 
                    campaigns.reduce((sum, camp) => sum + camp.sentCount, 1)) * 100
                  )}%
                </div>
              </div>
              <Progress 
                value={
                  (campaigns.reduce((sum, camp) => sum + camp.deliveredCount, 0) / 
                  campaigns.reduce((sum, camp) => sum + camp.sentCount, 1)) * 100
                } 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Read Rate</div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (campaigns.reduce((sum, camp) => sum + camp.readCount, 0) / 
                    campaigns.reduce((sum, camp) => sum + camp.deliveredCount, 1)) * 100
                  )}%
                </div>
              </div>
              <Progress 
                value={
                  (campaigns.reduce((sum, camp) => sum + camp.readCount, 0) / 
                  campaigns.reduce((sum, camp) => sum + camp.deliveredCount, 1)) * 100
                } 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Response Rate</div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (campaigns.reduce((sum, camp) => sum + camp.responseCount, 0) / 
                    campaigns.reduce((sum, camp) => sum + camp.readCount, 1)) * 100
                  )}%
                </div>
              </div>
              <Progress 
                value={
                  (campaigns.reduce((sum, camp) => sum + camp.responseCount, 0) / 
                  campaigns.reduce((sum, camp) => sum + camp.readCount, 1)) * 100
                } 
                className="h-2" 
              />
            </div>
            
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Average Open Rate</div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      campaigns.reduce((sum, camp) => sum + camp.stats.openRate, 0) / campaigns.length
                    )}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Conversion Rate</div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      campaigns.reduce((sum, camp) => sum + camp.stats.conversionRate, 0) / campaigns.length
                    )}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <CampaignTabs 
        campaigns={campaigns}
        onEditCampaign={handleEditCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onPauseCampaign={handlePauseCampaign}
        onResumeCampaign={handleResumeCampaign}
        onViewCampaign={handleViewCampaign}
      />
    </div>
  )
} 