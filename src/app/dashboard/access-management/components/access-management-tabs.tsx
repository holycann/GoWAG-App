import React from "react"
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

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "pending" | "inactive"
  avatar: string | null
  lastLogin: string | null
  createdAt: string
  permissions: string[]
}

interface Role {
  id: string
  name: string
  description: string
  permissionCount: number
}

interface AuditLogEntry {
  id: string
  action: string
  user: string
  target: string
  details: string
  timestamp: string
  ip: string
}

interface AccessManagementTabsProps {
  users: User[]
  roles: Role[]
  auditLogs: AuditLogEntry[]
  onEditUser: (userId: string) => void
  onDeleteUser: (userId: string) => void
  onActivateUser: (userId: string) => void
  onDeactivateUser: (userId: string) => void
  onEditPermissions: (userId: string) => void
  onCreateRole: () => void
  onEditRole: (roleId: string) => void
  onDeleteRole: (roleId: string) => void
  onViewPermissions: (roleId: string) => void
}

export function AccessManagementTabs({
  users,
  roles,
  auditLogs,
  onEditUser,
  onDeleteUser,
  onActivateUser,
  onDeactivateUser,
  onEditPermissions,
  onCreateRole,
  onEditRole,
  onDeleteRole,
  onViewPermissions
}: AccessManagementTabsProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  
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
                            <DropdownMenuItem onClick={() => onEditUser(user.id)}>
                              <UserCog className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditPermissions(user.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => onDeactivateUser(user.id)}>
                                <X className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : user.status === "inactive" || user.status === "pending" ? (
                              <DropdownMenuItem onClick={() => onActivateUser(user.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => onDeleteUser(user.id)}
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
              <Button onClick={onCreateRole}>
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
                {roles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No roles defined
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => (
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
                            <DropdownMenuItem onClick={() => onEditRole(role.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onViewPermissions(role.id)}>
                              <Shield className="mr-2 h-4 w-4" />
                              View Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {role.id !== "admin" && (
                              <DropdownMenuItem 
                                onClick={() => onDeleteRole(role.id)}
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
                  ))
                )}
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
                {auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs.map((log) => (
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
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 