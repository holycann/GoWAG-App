import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, RefreshCw, Filter, Calendar, Code, CheckCircle, XCircle, AlertCircle, ArrowUpDown, RotateCw, Eye, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample data for webhook logs
const webhookLogs = [
  {
    id: "whk_123456",
    eventType: "message.received",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T08:15:10",
    responseTime: 245,
    attempts: 1,
    payload: {
      event: "message.received",
      data: {
        messageId: "msg_123456",
        from: "+62 812-3456-7890",
        content: "Halo, saya ingin bertanya tentang produk Anda",
        timestamp: "2023-06-27T08:15:00",
      },
    },
  },
  {
    id: "whk_123457",
    eventType: "message.sent",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T08:16:35",
    responseTime: 187,
    attempts: 1,
    payload: {
      event: "message.sent",
      data: {
        messageId: "msg_123457",
        to: "+62 812-3456-7890",
        content: "Terima kasih telah menghubungi kami. Ada yang bisa saya bantu?",
        timestamp: "2023-06-27T08:16:30",
      },
    },
  },
  {
    id: "whk_123458",
    eventType: "message.received",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T09:22:20",
    responseTime: 203,
    attempts: 1,
    payload: {
      event: "message.received",
      data: {
        messageId: "msg_123458",
        from: "+62 813-9876-5432",
        content: "Apakah pesanan saya sudah dikirim?",
        timestamp: "2023-06-27T09:22:15",
      },
    },
  },
  {
    id: "whk_123459",
    eventType: "message.sent",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T09:22:23",
    responseTime: 195,
    attempts: 1,
    payload: {
      event: "message.sent",
      data: {
        messageId: "msg_123459",
        to: "+62 813-9876-5432",
        content: "Terima kasih telah menghubungi kami. Tim kami akan segera membalas pesan Anda.",
        timestamp: "2023-06-27T09:22:18",
      },
    },
  },
  {
    id: "whk_123460",
    eventType: "message.sent",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T09:25:50",
    responseTime: 211,
    attempts: 1,
    payload: {
      event: "message.sent",
      data: {
        messageId: "msg_123460",
        to: "+62 813-9876-5432",
        content: "Halo, bisa tolong berikan nomor pesanan Anda agar saya dapat memeriksakannya?",
        timestamp: "2023-06-27T09:25:45",
      },
    },
  },
  {
    id: "whk_123461",
    eventType: "message.received",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T10:05:17",
    responseTime: 178,
    attempts: 1,
    payload: {
      event: "message.received",
      data: {
        messageId: "msg_123461",
        from: "+62 856-1122-3344",
        content: "Saya tertarik dengan promo yang Anda tawarkan",
        timestamp: "2023-06-27T10:05:12",
      },
    },
  },
  {
    id: "whk_123462",
    eventType: "message.sent",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "failed",
    statusCode: 500,
    timestamp: "2023-06-27T10:10:38",
    responseTime: null,
    attempts: 5,
    payload: {
      event: "message.sent",
      data: {
        messageId: "msg_123462",
        to: "+62 856-1122-3344",
        content: "Terima kasih atas ketertarikan Anda. Berikut detail lengkap promo kami: [attachment: promo.pdf]",
        timestamp: "2023-06-27T10:10:33",
      },
    },
    error: "Internal Server Error from webhook endpoint",
  },
  {
    id: "whk_123463",
    eventType: "message.sent",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "delivered",
    statusCode: 200,
    timestamp: "2023-06-27T10:12:25",
    responseTime: 3245,
    attempts: 1,
    payload: {
      event: "message.sent",
      data: {
        messageId: "msg_123463",
        to: "+62 856-1122-3344",
        content: "Mohon maaf, pesan sebelumnya gagal terkirim. Berikut detail promo kami...",
        timestamp: "2023-06-27T10:12:20",
      },
    },
  },
  {
    id: "whk_123464",
    eventType: "session.connected",
    endpoint: "https://example.com/webhooks/whatsapp",
    status: "pending",
    statusCode: null,
    timestamp: "2023-06-27T11:30:05",
    responseTime: null,
    attempts: 2,
    payload: {
      event: "session.connected",
      data: {
        sessionId: "session_125",
        phone: "+62 877-1234-5678",
        timestamp: "2023-06-27T11:30:00",
      },
    },
  },
];

export default function WebhookLogsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Webhook Logs</h1>
          <p className="text-muted-foreground">
            Monitor status pengiriman events ke webhook endpoints
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
          <CardDescription>
            Gunakan filter untuk mencari webhook events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Webhook Endpoint</Label>
              <Select>
                <SelectTrigger id="endpoint">
                  <SelectValue placeholder="Semua Endpoints" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Endpoints</SelectItem>
                  <SelectItem value="example">https://example.com/webhooks/whatsapp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-type">Tipe Event</Label>
              <Select>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Semua Events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Events</SelectItem>
                  <SelectItem value="message.received">message.received</SelectItem>
                  <SelectItem value="message.sent">message.sent</SelectItem>
                  <SelectItem value="message.status">message.status</SelectItem>
                  <SelectItem value="session.connected">session.connected</SelectItem>
                  <SelectItem value="session.disconnected">session.disconnected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tanggal</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Tanggal Mulai</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Tanggal Akhir</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search-payload">Cari di Payload</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-payload"
                  placeholder="Cari teks dalam payload..."
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2 self-end">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Filter className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button className="flex-1">
                  <Search className="mr-2 h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2">{webhookLogs.length}</div>
              <p className="text-sm text-muted-foreground text-center">Total Events</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2 text-green-600">
                {webhookLogs.filter(log => log.status === "delivered").length}
              </div>
              <p className="text-sm text-muted-foreground text-center">Delivered Successfully</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2 text-red-600">
                {webhookLogs.filter(log => log.status === "failed").length}
              </div>
              <p className="text-sm text-muted-foreground text-center">Failed Deliveries</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold mb-2 text-yellow-600">
                {webhookLogs.filter(log => log.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground text-center">Pending Deliveries</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <WebhookLogsTable logs={webhookLogs} />
        </TabsContent>
        
        <TabsContent value="delivered">
          <WebhookLogsTable logs={webhookLogs.filter(log => log.status === "delivered")} />
        </TabsContent>
        
        <TabsContent value="failed">
          <WebhookLogsTable logs={webhookLogs.filter(log => log.status === "failed")} />
        </TabsContent>
        
        <TabsContent value="pending">
          <WebhookLogsTable logs={webhookLogs.filter(log => log.status === "pending")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WebhookLogsTable({ logs }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Webhook Events</CardTitle>
            <CardDescription>
              Showing {logs.length} webhook events
            </CardDescription>
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[180px]">
                  <div className="flex items-center">
                    Tanggal & Waktu
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="w-[180px]">Event Type</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Code</TableHead>
                <TableHead className="w-[100px]">Response Time</TableHead>
                <TableHead className="w-[80px]">Attempts</TableHead>
                <TableHead className="w-[80px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{log.eventType}</div>
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate">
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 mr-1.5 text-muted-foreground" />
                      {log.endpoint}
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.status === "delivered" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" /> Delivered
                      </Badge>
                    ) : log.status === "failed" ? (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                        <XCircle className="mr-1 h-3 w-3" /> Failed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        <AlertCircle className="mr-1 h-3 w-3" /> Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {log.statusCode ? (
                      <Badge
                        variant="outline"
                        className={
                          log.statusCode >= 200 && log.statusCode < 300
                            ? "bg-green-100 text-green-800"
                            : log.statusCode >= 400 && log.statusCode < 500
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {log.statusCode}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {log.responseTime ? `${log.responseTime}ms` : "-"}
                  </TableCell>
                  <TableCell>{log.attempts}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Webhook Event Details</DialogTitle>
                          <DialogDescription>
                            Event ID: {log.id}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h3 className="font-medium mb-2">Event Information</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Event Type:</span>
                                <span className="font-medium">{log.eventType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Timestamp:</span>
                                <span className="font-medium">{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Endpoint:</span>
                                <span className="font-medium">{log.endpoint}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <span className={`font-medium ${
                                  log.status === "delivered"
                                    ? "text-green-600"
                                    : log.status === "failed"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }`}>
                                  {log.status}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Status Code:</span>
                                <span className="font-medium">{log.statusCode || "-"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Response Time:</span>
                                <span className="font-medium">{log.responseTime ? `${log.responseTime}ms` : "-"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Attempts:</span>
                                <span className="font-medium">{log.attempts}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2">Error Information</h3>
                            {log.error ? (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
                                {log.error}
                              </div>
                            ) : (
                              <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                                No errors reported
                              </div>
                            )}
                            
                            {log.status === "pending" && (
                              <div className="mt-4">
                                <Button size="sm">
                                  <RotateCw className="mr-2 h-4 w-4" /> Retry Now
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <h3 className="font-medium mb-2">Payload</h3>
                          <div className="bg-muted p-3 rounded-md overflow-auto max-h-[300px]">
                            <pre className="text-xs font-mono whitespace-pre-wrap">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline">Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing 1-{logs.length} of {logs.length} events
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