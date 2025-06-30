import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BugIcon,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  RefreshCw,
  Search,
  Filter,
  PlusCircle
} from "lucide-react";

// Sample bug reports and feedback
const feedbackItems = [
  {
    id: "fb_1",
    type: "bug",
    title: "Message delivery status not updating",
    description: "When sending messages to multiple recipients, sometimes the delivery status doesn't update correctly for all recipients.",
    status: "open",
    priority: "high",
    createdAt: "2023-07-05T10:30:00",
    updatedAt: "2023-07-05T15:45:00",
    category: "messaging",
    user: {
      name: "Ahmad Setiawan",
      email: "ahmad@example.com",
      avatar: "/placeholder-user.jpg"
    },
    responses: [
      {
        id: "resp_1",
        content: "We're investigating this issue. Could you provide more details about the specific recipients that are affected?",
        createdAt: "2023-07-05T15:45:00",
        isStaff: true,
        user: {
          name: "Support Team",
          avatar: "/placeholder-logo.png"
        }
      }
    ]
  },
  {
    id: "fb_2",
    type: "feature",
    title: "Add bulk message scheduling",
    description: "It would be great to have the ability to schedule bulk messages to be sent at specific times, with options for recurring schedules.",
    status: "under-review",
    priority: "medium",
    createdAt: "2023-07-03T14:20:00",
    updatedAt: "2023-07-04T09:15:00",
    category: "scheduling",
    user: {
      name: "Dewi Lestari",
      email: "dewi@example.com",
      avatar: null
    },
    responses: []
  },
  {
    id: "fb_3",
    type: "bug",
    title: "API authentication fails intermittently",
    description: "Sometimes API requests return 401 errors even with valid credentials. This happens randomly and requires re-authentication.",
    status: "in-progress",
    priority: "critical",
    createdAt: "2023-07-02T16:45:00",
    updatedAt: "2023-07-06T11:30:00",
    category: "api",
    user: {
      name: "Budi Santoso",
      email: "budi@example.com",
      avatar: null
    },
    responses: [
      {
        id: "resp_2",
        content: "We've identified the issue with our authentication service and are working on a fix. We expect to deploy the fix within the next 24 hours.",
        createdAt: "2023-07-06T11:30:00",
        isStaff: true,
        user: {
          name: "Technical Support",
          avatar: "/placeholder-logo.png"
        }
      }
    ]
  },
  {
    id: "fb_4",
    type: "feedback",
    title: "Improve contact management interface",
    description: "The contact management screen could be more user-friendly. It would be helpful to add batch operations and better filtering options.",
    status: "planned",
    priority: "low",
    createdAt: "2023-06-28T09:10:00",
    updatedAt: "2023-07-01T14:25:00",
    category: "ui",
    user: {
      name: "Siti Nuraini",
      email: "siti@example.com",
      avatar: null
    },
    responses: [
      {
        id: "resp_3",
        content: "Thank you for your feedback! We've added this to our product roadmap for the next UI update, which is planned for next quarter.",
        createdAt: "2023-07-01T14:25:00",
        isStaff: true,
        user: {
          name: "Product Team",
          avatar: "/placeholder-logo.png"
        }
      }
    ]
  },
  {
    id: "fb_5",
    type: "bug",
    title: "Media uploads failing on Safari browser",
    description: "When trying to upload images and videos using Safari browser on macOS, the upload process hangs and never completes.",
    status: "resolved",
    priority: "medium",
    createdAt: "2023-06-25T11:20:00",
    updatedAt: "2023-06-27T16:40:00",
    category: "media",
    user: {
      name: "Ricky Hartono",
      email: "ricky@example.com",
      avatar: null
    },
    responses: [
      {
        id: "resp_4",
        content: "We've identified and fixed the compatibility issue with Safari. The fix is now live in version 2.3.5.",
        createdAt: "2023-06-27T16:40:00",
        isStaff: true,
        user: {
          name: "Engineering Team",
          avatar: "/placeholder-logo.png"
        }
      }
    ]
  },
];

export default function FeedbackPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Feedback & Bug Reports</h1>
          <p className="text-muted-foreground">
            Report issues and suggest improvements
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Submit Feedback
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BugIcon className="mr-2 h-4 w-4 text-primary" /> Open Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => item.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active bugs and requests
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => item.status === "in-progress" || item.status === "under-review").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Being worked on or reviewed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {feedbackItems.filter(item => item.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Issues fixed and closed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="bugs">Bugs</TabsTrigger>
            <TabsTrigger value="features">Feature Requests</TabsTrigger>
            <TabsTrigger value="feedback">General Feedback</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search issues..." 
                className="pl-9 w-[200px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority (High-Low)</SelectItem>
                <SelectItem value="updated">Last Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-4">
            {feedbackItems.map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="bugs" className="mt-0">
          <div className="space-y-4">
            {feedbackItems
              .filter(item => item.type === "bug")
              .map((item) => (
                <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-0">
          <div className="space-y-4">
            {feedbackItems
              .filter(item => item.type === "feature")
              .map((item) => (
                <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-0">
          <div className="space-y-4">
            {feedbackItems
              .filter(item => item.type === "feedback")
              .map((item) => (
                <FeedbackCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Feedback</CardTitle>
          <CardDescription>
            Report a bug or suggest a feature improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="feedback">General Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="messaging">Messaging</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="ui">User Interface</SelectItem>
                    <SelectItem value="scheduling">Scheduling</SelectItem>
                    <SelectItem value="media">Media Handling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Brief summary of the issue" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Please provide details about the issue or suggestion..."
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="attachment">Attachment (Optional)</Label>
                <Input id="attachment" type="file" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit Feedback</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function FeedbackCard({ item }) {
  return (
    <Card>
      <div 
        className={`h-1.5 w-full ${
          item.priority === "critical" 
            ? "bg-red-500" 
            : item.priority === "high" 
            ? "bg-orange-500" 
            : item.priority === "medium" 
            ? "bg-blue-500" 
            : "bg-green-500"
        }`}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {item.type === "bug" ? (
              <BugIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
            ) : item.type === "feature" ? (
              <Lightbulb className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
            <CardTitle>{item.title}</CardTitle>
          </div>
          <Badge
            className={
              item.status === "open"
                ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                : item.status === "in-progress"
                ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                : item.status === "resolved"
                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                : item.status === "under-review"
                ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400"
                : item.status === "planned"
                ? "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400"
                : ""
            }
          >
            {item.status === "open" ? (
              <>
                <AlertCircle className="mr-1 h-3 w-3" /> Open
              </>
            ) : item.status === "in-progress" ? (
              <>
                <RefreshCw className="mr-1 h-3 w-3" /> In Progress
              </>
            ) : item.status === "resolved" ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" /> Resolved
              </>
            ) : item.status === "under-review" ? (
              <>
                <Clock className="mr-1 h-3 w-3" /> Under Review
              </>
            ) : item.status === "planned" ? (
              <>
                <Clock className="mr-1 h-3 w-3" /> Planned
              </>
            ) : (
              item.status
            )}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{item.category}</Badge>
          <Badge 
            variant="outline"
            className={
              item.priority === "critical"
                ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                : item.priority === "high"
                ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400"
                : item.priority === "medium"
                ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400"
            }
          >
            {item.priority} priority
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.user.avatar || ""} />
              <AvatarFallback>
                {item.user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{item.user.name}</span>
          </div>
        </div>

        {item.responses.length > 0 && (
          <div className="space-y-3">
            <div className="h-px w-full bg-border"></div>
            {item.responses.map((response) => (
              <div key={response.id} className="ml-4 mt-2 pl-3 border-l-2 border-muted">
                <p className="text-sm">{response.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={response.user.avatar || ""} />
                    <AvatarFallback>
                      {response.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">
                    {response.user.name}
                    {response.isStaff && (
                      <Badge variant="outline" className="ml-1 text-[10px] py-0 h-4">Staff</Badge>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-7">
            <ThumbsUp className="mr-1.5 h-3.5 w-3.5" /> Helpful
          </Button>
          <Button variant="ghost" size="sm" className="h-7">
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Comment
          </Button>
        </div>
        {item.status !== "resolved" && (
          <Button variant="outline" size="sm" className="h-7">
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Mark as Resolved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 