"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageSquare, UserPlus, Tag, Trash2, MoreHorizontal } from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  tags: string[];
  createdAt: string;
  lastContactedAt?: string | null;
  notes?: string;
  avatar?: string | null;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
  onSendMessage?: (contact: Contact) => void;
  onManageTags?: (contact: Contact) => void;
}

export function ContactList({
  contacts,
  onEdit,
  onDelete,
  onSendMessage,
  onManageTags,
}: ContactListProps) {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox />
          </TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Last Contacted</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={contact.avatar || ""} alt={contact.name} />
                  <AvatarFallback>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">{contact.phoneNumber}</div>
                  {contact.email && (
                    <div className="text-xs text-muted-foreground">{contact.email}</div>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {contact.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={
                      tag === "customer"
                        ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                        : tag === "priority" || tag === "VIP"
                        ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400"
                        : tag === "lead"
                        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                        : tag === "inactive"
                        ? "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400"
                        : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm max-w-[200px] truncate">
                {contact.notes}
              </div>
            </TableCell>
            <TableCell>
              {contact.lastContactedAt ? (
                <div className="text-sm">
                  {new Date(contact.lastContactedAt).toLocaleDateString("id-ID")}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Never</div>
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
                  <DropdownMenuItem onClick={() => onSendMessage?.(contact)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Send Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(contact)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Edit Contact</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onManageTags?.(contact)}>
                    <Tag className="mr-2 h-4 w-4" />
                    <span>Manage Tags</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => onDelete?.(contact)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 