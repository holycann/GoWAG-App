import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  UserPlus, 
  Check, 
  X, 
  MoreHorizontal, 
  Shield, 
  User, 
  UserCog, 
  Clock, 
  Eye, 
  Lock, 
  AlertTriangle,
  Users,
  UserX,
  Mail,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample users data
const users = [
  {
    id: "user_1",
    name: "Ahmad Setiawan",
    email: "ahmad@example.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
    lastLogin: "2023-06-27T08:15:10",
    createdAt: "2023-01-15T10:30:00",
    permissions: [
      "users.view", "users.edit", "users.create", "users.delete",
      "sessions.view", "sessions.manage",
      "messages.view", "messages.send", "messages.delete",
      "webhooks.view", "webhooks.edit",
      "settings.view", "settings.edit"
    ]
  },
  {
    id: "user_2",
    name: "Dewi Lestari",
    email: "dewi@example.com",
    role: "manager",
    status: "active",
    avatar: null,
    lastLogin: "2023-06-26T14:30:22",
    createdAt: "2023-02-20T09:15:00",
    permissions: [
      "users.view",
      "sessions.view", "sessions.manage",
      "messages.view", "messages.send",
      "webhooks.view",
      "settings.view"
    ]
  },
  {
    id: "user_3",
    name: "Budi Santoso",
    email: "budi@example.com",
    role: "operator",
    status: "active",
    avatar: null,
    lastLogin: "2023-06-27T10:45:33",
    createdAt: "2023-03-10T13:45:00",
    permissions: [
      "sessions.view",
      "messages.view", "messages.send",
      "webhooks.view"
    ]
  },
  {
    id: "user_4",
    name: "Siti Nuraini",
    email: "siti@example.com",
    role: "viewer",
    status: "active",
    avatar: null,
    lastLogin: "2023-06-25T16:20:15",
    createdAt: "2023-04-05T11:30:00",
    permissions: [
      "sessions.view",
      "messages.view"
    ]
  },
  {
    id: "user_5",
    name: "Ricky Hartono",
    email: "ricky@example.com",
    role: "operator",
    status: "pending",
    avatar: null,
    lastLogin: null,
    createdAt: "2023-06-20T09:00:00",
    permissions: [
      "sessions.view",
      "messages.view", "messages.send"
    ]
  },
  {
    id: "user_6",
    name: "Lina Wijaya",
    email: "lina@example.com",
    role: "operator",
    status: "inactive",
    avatar: null,
    lastLogin: "2023-05-10T11:15:45",
    createdAt: "2023-02-28T15:30:00",
    permissions: [
      "sessions.view",
      "messages.view", "messages.send"
    ]
  }
];

// Define roles
const roles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all features including user management",
    permissionCount: 15,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage WhatsApp sessions and all message functions",
    permissionCount: 10,
  },
  {
    id: "operator",
    name: "Operator",
    description: "Can send messages and view sessions",
    permissionCount: 5,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to sessions and messages",
    permissionCount: 2,
  }
];

export default function AccessManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Access Management</h1>
          <p className="text-muted-foreground">
            Kelola pengguna dan hak akses ke sistem WhatsApp Gateway
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Invite User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new user to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="user-email">Email Address</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="email@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="user-name">Name</Label>
                <Input
                  id="user-name"
                  placeholder="Full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger id="user-role" className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  You can adjust specific permissions after inviting the user.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="send-welcome" defaultChecked />
                <Label htmlFor="send-welcome">Send welcome email</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="mb-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Users</CardTitle>
                  <CardDescription>
                    All users who have access to the WhatsApp Gateway system.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search users..." 
                    className="w-[200px]"
                  />
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || ""} alt={user.name} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30"
                              : user.role === "manager"
                              ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30"
                              : user.role === "operator"
                              ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30"
                              : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30"
                          }
                        >
                          <span className="capitalize">{user.role}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                            <Check className="mr-1 h-3 w-3" /> Active
                          </Badge>
                        ) : user.status === "inactive" ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400">
                            <X className="mr-1 h-3 w-3" /> Inactive
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400">
                            <Clock className="mr-1 h-3 w-3" /> Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          <div className="text-sm">
                            {new Date(user.lastLogin).toLocaleDateString("id-ID")}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString("id-ID")}
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              <span>Edit Permissions</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Send Password Reset</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem className="text-destructive">
                                <UserX className="mr-2 h-4 w-4" />
                                <span>Deactivate User</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Activate User</span>
                              </DropdownMenuItem>
                            )}
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
                Showing {users.length} users
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Role Overview</CardTitle>
                <CardDescription>
                  Assign users to predefined roles with specific permission sets
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="font-medium capitalize">{role.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{role.description}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{role.permissionCount} Permissions</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge>
                            {users.filter(u => u.role === role.id.toLowerCase()).length} users
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Edit Permissions
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="p-4 bg-muted/10">
                <Alert className="w-full">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>About Role-Based Access</AlertTitle>
                  <AlertDescription>
                    Roles provide a convenient way to assign permissions to groups of users.
                    For more granular control, you can customize individual user permissions.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>
                Overview of permissions granted to each role
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[250px]">Permission</TableHead>
                      <TableHead>Administrator</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Operator</TableHead>
                      <TableHead>Viewer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          View Users
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
                          Manage Users
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          View Sessions
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                          Manage Sessions
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          View Messages
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          Send Messages
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                          System Settings
                        </div>
                      </TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                      <TableCell><X className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                Security audit trail of user access and system changes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-27 08:15:10
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>Ahmad Setiawan</div>
                      </div>
                    </TableCell>
                    <TableCell>User login successful</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-27 08:30:22
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>Ahmad Setiawan</div>
                      </div>
                    </TableCell>
                    <TableCell>Added new user: Ricky Hartono</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-27 09:15:45
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>BS</AvatarFallback>
                        </Avatar>
                        <div>Budi Santoso</div>
                      </div>
                    </TableCell>
                    <TableCell>User login successful</TableCell>
                    <TableCell>203.45.67.89</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-27 10:05:12
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>DL</AvatarFallback>
                        </Avatar>
                        <div>Dewi Lestari</div>
                      </div>
                    </TableCell>
                    <TableCell>Modified user permissions: Siti Nuraini</TableCell>
                    <TableCell>192.168.1.110</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-27 10:45:33
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>BS</AvatarFallback>
                        </Avatar>
                        <div>Budi Santoso</div>
                      </div>
                    </TableCell>
                    <TableCell>Failed to access user management</TableCell>
                    <TableCell>203.45.67.89</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                        Failed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-26 16:22:30
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>DL</AvatarFallback>
                        </Avatar>
                        <div>Dewi Lestari</div>
                      </div>
                    </TableCell>
                    <TableCell>User login successful</TableCell>
                    <TableCell>192.168.1.110</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      2023-06-26 14:35:10
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>Ahmad Setiawan</div>
                      </div>
                    </TableCell>
                    <TableCell>Changed system settings</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Success
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing recent 7 audit events
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Log
                </Button>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 