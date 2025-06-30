import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  MessageSquare, 
  UserPlus, 
  FileEdit, 
  Settings, 
  LogOut 
} from "lucide-react";

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  isAdmin: boolean;
  status: "active" | "archived";
  lastActivity: string;
  participants?: {
    name: string;
    isAdmin: boolean;
  }[];
}

interface GroupsGridProps {
  groups: Group[];
}

export function GroupsGrid({ groups }: GroupsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <Card key={group.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={group.avatar} alt={group.name} />
                  <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{group.name}</CardTitle>
                  <CardDescription className="text-sm">{group.memberCount} members</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Send Message</span>
                  </DropdownMenuItem>
                  {group.isAdmin && (
                    <>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Add Participants</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        <span>Edit Group Info</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Group Settings</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Leave Group</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
            <div className="flex items-center justify-between mt-4">
              <Badge variant={group.status === "active" ? "default" : "secondary"}>
                {group.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Last active {group.lastActivity}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 