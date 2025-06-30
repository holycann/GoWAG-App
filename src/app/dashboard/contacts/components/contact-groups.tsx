"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, UsersRound } from "lucide-react";
import { ContactGroup } from "./contact-form-dialog";

interface ContactGroupsProps {
  groups: ContactGroup[];
  onViewGroup: (group: ContactGroup) => void;
  onEditGroup: (group: ContactGroup) => void;
  onDeleteGroup: (group: ContactGroup) => void;
  onCreateGroup: () => void;
}

export function ContactGroups({
  groups,
  onViewGroup,
  onEditGroup,
  onDeleteGroup,
  onCreateGroup,
}: ContactGroupsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {groups.map((group) => (
          <Card key={group.id} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <UsersRound className="h-4 w-4 mr-2 text-primary" />
                {group.name}
              </CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{group.count}</div>
                <Badge variant="outline">Contacts</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="text-xs text-muted-foreground">
                Updated {new Date(group.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewGroup(group)}
                >
                  View
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditGroup(group)}
                >
                  Edit
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-muted-foreground">Create Group</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pb-6 pt-4">
            <Plus className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm text-center">
              Create a new contact group to organize contacts
            </p>
          </CardContent>
          <CardFooter className="pt-0 justify-center">
            <Button variant="outline" className="w-full" onClick={onCreateGroup}>
              <Plus className="mr-2 h-4 w-4" /> Create Group
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Group Management</CardTitle>
          <CardDescription>Manage your contact groups</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Contacts</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <UsersRound className="h-4 w-4 mr-2 text-muted-foreground" />
                      {group.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm max-w-[250px] truncate">
                      {group.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge>{group.count}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(group.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(group.updatedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewGroup(group)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEditGroup(group)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => onDeleteGroup(group)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
} 