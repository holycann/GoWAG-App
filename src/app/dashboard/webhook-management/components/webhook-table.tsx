import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'paused' | 'disabled';
}

interface WebhookTableProps {
  title: string;
  description: string;
  webhooks: Webhook[];
  onEdit?: (id: string) => void;
  onEnableDisable?: (id: string, currentStatus: 'active' | 'paused' | 'disabled') => void;
}

export function WebhookTable({
  title,
  description,
  webhooks,
  onEdit,
  onEnableDisable
}: WebhookTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {webhooks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No webhooks found. Add one to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{webhook.url}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline">{event}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div 
                        className={`mr-2 h-2 w-2 rounded-full ${
                          webhook.status === 'active' 
                            ? 'bg-green-500' 
                            : webhook.status === 'paused' 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`} 
                      />
                      <span className="text-sm capitalize">{webhook.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit?.(webhook.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={
                        webhook.status === 'active' 
                          ? 'text-red-500' 
                          : 'text-emerald-500'
                      }
                      onClick={() => onEnableDisable?.(
                        webhook.id, 
                        webhook.status
                      )}
                    >
                      {webhook.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 