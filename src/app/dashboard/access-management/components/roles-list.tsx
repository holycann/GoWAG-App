import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Shield,
  Plus
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Role {
  id: string
  name: string
  description: string
  permissionCount: number
}

interface RolesListProps {
  roles: Role[]
  onCreateRole: () => void
  onEditRole: (roleId: string) => void
  onDeleteRole: (roleId: string) => void
  onViewPermissions: (roleId: string) => void
}

export function RolesList({
  roles,
  onCreateRole,
  onEditRole,
  onDeleteRole,
  onViewPermissions
}: RolesListProps) {
  return (
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
  )
}