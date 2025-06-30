"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  PlayCircle,
  PauseCircle,
  RefreshCw,
  CheckCircle,
  TimerOff,
  Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ScheduledMessage {
  id: string;
  subject: string;
  message: string;
  recipients: string[];
  recipientCount: number;
  scheduledFor: string;
  status: 'scheduled' | 'paused' | 'sent';
  recurring: 'daily' | 'weekly' | 'monthly' | null;
  lastSent: string | null;
  createdAt: string;
}

interface ScheduledMessageListProps {
  messages: ScheduledMessage[];
  onEdit: (message: ScheduledMessage) => void;
  onDelete: (message: ScheduledMessage) => void;
  onPause: (message: ScheduledMessage) => void;
  onResume: (message: ScheduledMessage) => void;
  onDuplicate: (message: ScheduledMessage) => void;
}

export function ScheduledMessageList({
  messages,
  onEdit,
  onDelete,
  onPause,
  onResume,
  onDuplicate,
}: ScheduledMessageListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">Scheduled</Badge>;
      case 'paused':
        return <Badge variant="outline">Paused</Badge>;
      case 'sent':
        return <Badge variant="secondary">Sent</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getRecurringBadge = (recurring: string | null) => {
    if (!recurring) return null;
    
    return (
      <Badge variant="outline" className="ml-2 capitalize">
        {recurring}
      </Badge>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Scheduled Messages</CardTitle>
            <CardDescription>
              View and manage your scheduled messages
            </CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Scheduled For</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No scheduled messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">
                    {message.subject}
                    {getRecurringBadge(message.recurring)}
                  </TableCell>
                  <TableCell>
                    {message.recipients.join(", ")}
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.recipientCount} recipient{message.recipientCount !== 1 ? 's' : ''}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(message.scheduledFor)}
                    {message.lastSent && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Last sent: {formatDate(message.lastSent)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(message)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(message)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {message.status === 'scheduled' ? (
                          <DropdownMenuItem onClick={() => onPause(message)}>
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                        ) : message.status === 'paused' ? (
                          <DropdownMenuItem onClick={() => onResume(message)}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Resume
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDelete(message)}
                          className="text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
      <CardFooter className="p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {messages.length} messages
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