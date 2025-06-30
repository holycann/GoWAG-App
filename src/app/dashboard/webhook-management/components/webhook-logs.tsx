import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, RotateCw, RefreshCw } from "lucide-react"

interface WebhookLog {
  id: string
  timestamp: string
  event: string
  webhook: string
  status: 'success' | 'failed' | 'pending'
  responseCode?: number
  responseTime?: number
}

interface WebhookLogsProps {
  logs: WebhookLog[]
  onRefresh?: () => void
  onFilterChange?: (status: string) => void
  onViewDetails?: (id: string) => void
  onRetry?: (id: string) => void
}

export function WebhookLogs({
  logs,
  onRefresh,
  onFilterChange,
  onViewDetails,
  onRetry
}: WebhookLogsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Webhook Delivery Logs</CardTitle>
          <CardDescription>
            Recent webhook delivery attempts and responses
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={onFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Webhook</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No webhook logs found
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.event}</Badge>
                  </TableCell>
                  <TableCell>{log.webhook}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {log.status === 'success' && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                          <span>Success {log.responseCode && `(${log.responseCode})`}</span>
                          {log.responseTime && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              {log.responseTime}ms
                            </span>
                          )}
                        </>
                      )}
                      {log.status === 'failed' && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                          <span>Failed {log.responseCode && `(${log.responseCode})`}</span>
                        </>
                      )}
                      {log.status === 'pending' && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                          <span>Pending</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails?.(log.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {log.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRetry?.(log.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
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