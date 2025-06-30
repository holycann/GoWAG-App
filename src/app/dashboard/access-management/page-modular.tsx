"use client"

import React, { useState } from "react"
import { AccessManagementHeader } from "./components/access-management-header"
import { InviteUserDialog } from "./components/invite-user-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MoreHorizontal, 
  Shield, 
  UserCog, 
  UserX, 
  Check, 
  X,
  Edit,
  Trash2,
  Plus,
  Clock,
  AlertTriangle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
]

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
]

// Sample audit logs
const auditLogs = [
  {
    id: "log_1",
    action: "user.login",
    user: "Ahmad Setiawan",
    target: "System",
    details: "Successful login",
    timestamp: "2023-06-27T08:15:10",
    ip: "192.168.1.1"
  },
  {
    id: "log_2",
    action: "user.create",
    user: "Ahmad Setiawan",
    target: "Ricky Hartono",
    details: "New user created with role: operator",
    timestamp: "2023-06-20T09:00:00",
    ip: "192.168.1.1"
  },
  {
    id: "log_3",
    action: "user.permission.update",
    user: "Ahmad Setiawan",
    target: "Dewi Lestari",
    details: "Updated permissions for user",
    timestamp: "2023-06-15T11:30:45",
    ip: "192.168.1.1"
  },
  {
    id: "log_4",
    action: "user.login.failed",
    user: "Unknown",
    target: "System",
    details: "Failed login attempt for user: budi@example.com",
    timestamp: "2023-06-14T15:22:30",
    ip: "203.0.113.42"
  },
  {
    id: "log_5",
    action: "user.status.update",
    user: "Ahmad Setiawan",
    target: "Lina Wijaya",
    details: "User status changed from active to inactive",
    timestamp: "2023-05-10T11:15:45",
    ip: "192.168.1.1"
  },
  {
    id: "log_6",
    action: "role.permission.update",
    user: "Ahmad Setiawan",
    target: "operator role",
    details: "Updated permissions for role",
    timestamp: "2023-05-05T09:45:12",
    ip: "192.168.1.1"
  }
]

export default function AccessManagementPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  
  // Functions to handle user actions
  const handleInviteUser = (userData: any) => {
    console.log("Inviting user:", userData)
    setInviteDialogOpen(false)
  }
  
  const handleEditUser = (userId: string) => {
    console.log("Editing user:", userId)
  }
  
  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId)
  }
  
  const handleActivateUser = (userId: string) => {
    console.log("Activating user:", userId)
  }
  
  const handleDeactivateUser = (userId: string) => {
    console.log("Deactivating user:", userId)
  }
  
  const handleEditPermissions = (userId: string) => {
    console.log("Editing permissions for user:", userId)
  }
  
  // Functions to handle role actions
  const handleCreateRole = () => {
    console.log("Creating new role")
  }
  
  const handleEditRole = (roleId: string) => {
    console.log("Editing role:", roleId)
  }
  
  const handleDeleteRole = (roleId: string) => {
    console.log("Deleting role:", roleId)
  }
  
  const handleViewPermissions = (roleId: string) => {
    console.log("Viewing permissions for role:", roleId)
  }
  
  // Filter users based on search query
  const filteredUsers = searchQuery 
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    return role ? role.name : roleId
  }
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="container mx-auto p-6">
      <AccessManagementHeader
        title="Access Management"
        description="Kelola pengguna dan hak akses ke sistem WhatsApp Gateway"
        onInviteUser={() => setInviteDialogOpen(true)}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
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
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            {user.avatar ? (
                              <AvatarImage src={user.avatar} alt={user.name} />
                            ) : null}
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.role === "admin" ? (
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-primary mr-1" />
                              {getRoleName(user.role)}
                            </div>
                          ) : (
                            getRoleName(user.role)
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditPermissions(user.id)}>
                                <Shield className="mr-2 h-4 w-4" />
                                Edit Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}>
                                  <X className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : user.status === "inactive" || user.status === "pending" ? (
                                <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                                  <Check className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              ) : null}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Roles</CardTitle>
                  <CardDescription>
                    Define roles and permissions for system users
                  </CardDescription>
                </div>
                <Button onClick={handleCreateRole}>
                  <Plus className="mr-2 h-4 w-4" /> Create Role
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {role.id === "admin" && <Shield className="h-4 w-4 text-primary mr-2" />}
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.permissionCount} permissions</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditRole(role.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewPermissions(role.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              View Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {role.id !== "admin" && (
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRole(role.id)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
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
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Log</CardTitle>
                  <CardDescription>
                    System activity and security events
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search logs..." 
                    className="w-[200px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {log.action.includes("delete") ? (
                          <div className="flex items-center">
                            <Trash2 className="h-4 w-4 text-red-500 mr-2" />
                            {log.action}
                          </div>
                        ) : log.action.includes("login") ? (
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 text-blue-500 mr-2" />
                            {log.action}
                          </div>
                        ) : log.action.includes("failed") ? (
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                            {log.action}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-green-500 mr-2" />
                            {log.action}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{formatDate(log.timestamp)}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <InviteUserDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        roles={roles}
        onInvite={handleInviteUser}
      />
    </div>
  )
} 