"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Download, MessageSquareText, User, CalendarDays, CheckCheck, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { PageAlert } from "../components/page-alert" // Import PageAlert

// Dummy data for message history
const messageHistoryData = [
  {
    id: "hist1",
    recipient: "+12345678901",
    message: "Hello there! This is a test message.",
    type: "Outgoing",
    status: "Read",
    timestamp: "2025-06-22 10:05 AM",
  },
  {
    id: "hist2",
    recipient: "My Phone",
    message: "Hi! How are you doing?",
    type: "Incoming",
    status: "Received",
    timestamp: "2025-06-22 09:30 AM",
  },
  {
    id: "hist3",
    recipient: "+9876543210",
    message: "Your appointment is confirmed for tomorrow at 2 PM.",
    type: "Outgoing",
    status: "Delivered",
    timestamp: "2025-06-21 15:00 PM",
  },
  {
    id: "hist4",
    recipient: "+1122334455",
    message: "Failed to send: Promotion for new product launch!",
    type: "Outgoing",
    status: "Failed",
    timestamp: "2025-06-20 11:00 AM",
  },
  {
    id: "hist5",
    recipient: "Support Team",
    message: "I need help with my account.",
    type: "Incoming",
    status: "Received",
    timestamp: "2025-06-22 11:15 AM",
  },
]

export default function MessageHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)

  const filteredMessages = messageHistoryData.filter((msg) => {
    const matchesSearch =
      msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || msg.type.toLowerCase() === filterType
    const matchesStatus = filterStatus === "all" || msg.status.toLowerCase() === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Read":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <CheckCheck className="mr-1 h-3 w-3" />
            Read
          </Badge>
        )
      case "Delivered":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            <CheckCheck className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      case "Sent":
        return (
          <Badge className="bg-sky-100 text-sky-700 border-sky-300">
            <CheckCheck className="mr-1 h-3 w-3" />
            Sent
          </Badge>
        )
      case "Received":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-300">Received</Badge>
      case "Failed":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleExportHistory = async () => {
    setAlertInfo(null)
    // --- Placeholder for actual export logic ---
    console.log("Exporting history with filters:", { searchTerm, filterType, filterStatus })
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate export
    setAlertInfo({
      type: "success",
      title: "Export Started",
      message: "Message history export has started. You will be notified upon completion.",
    })
    // --- End of placeholder ---
    setTimeout(() => setAlertInfo(null), 4000)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-fadeIn">
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brandDarkBlue">Message History</h1>
          <p className="text-muted-foreground">Review all your past incoming and outgoing messages.</p>
        </div>
        <Button variant="outline" className="mt-4 sm:mt-0 group hover:bg-slate-100" onClick={handleExportHistory}>
          <Download className="mr-2 h-4 w-4 text-brandDarkBlue group-hover:text-brandDarkBlue/90" />
          Export History
        </Button>
      </header>

      <Card className="rounded-xl shadow-md animate-slideUp">
        <CardHeader>
          <CardTitle className="text-gray-700">Message Log</CardTitle>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by recipient or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm focus:ring-brandDarkBlue focus:border-brandDarkBlue"
            />
            <div className="flex gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px] focus:ring-brandDarkBlue focus:border-brandDarkBlue">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px] focus:ring-brandDarkBlue focus:border-brandDarkBlue">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Dialog component should wrap the Table or be outside if only one is needed.
              For multiple triggers in a table, each row needs its own Dialog or a shared one controlled by state.
              The previous fix placed Dialog per row, which is correct.
              The outer Dialog here is redundant if each row has its own.
              Removing the outer Dialog from CardContent.
           */}
          {filteredMessages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-gray-600">
                    <User className="inline-block mr-1 h-4 w-4" /> Recipient
                  </TableHead>
                  <TableHead className="text-gray-600">
                    <MessageSquareText className="inline-block mr-1 h-4 w-4" /> Message
                  </TableHead>
                  <TableHead className="w-[120px] text-gray-600">Type</TableHead>
                  <TableHead className="w-[180px] text-gray-600">
                    <CalendarDays className="inline-block mr-1 h-4 w-4" /> Timestamp
                  </TableHead>
                  <TableHead className="w-[120px] text-gray-600">Status</TableHead>
                  <TableHead className="w-[100px] text-right text-gray-600">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((msg) => (
                  <TableRow key={msg.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-800">{msg.recipient}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-sm">{msg.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant={msg.type === "Incoming" ? "secondary" : "outline"}
                        className={
                          msg.type === "Incoming"
                            ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                            : "border-slate-300"
                        }
                      >
                        {msg.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{msg.timestamp}</TableCell>
                    <TableCell>{getStatusBadge(msg.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        {" "}
                        {/* Each row gets its own Dialog context for its trigger */}
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-brandDarkBlue"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg rounded-xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center text-brandDarkBlue">
                              <MessageSquareText className="mr-2 h-6 w-6" /> Message Details
                            </DialogTitle>
                            <DialogDescription>Full content and details for the selected message.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-gray-600 col-span-1">Recipient:</Label>
                              <p className="col-span-3 font-medium text-gray-800">{msg.recipient}</p>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                              <Label className="text-right text-gray-600 col-span-1 pt-1">Message:</Label>
                              <p className="col-span-3 text-gray-700 bg-slate-50 p-3 rounded-md border max-h-40 overflow-y-auto">
                                {msg.message}
                              </p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-gray-600 col-span-1">Type:</Label>
                              <p className="col-span-3">{msg.type}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-gray-600 col-span-1">Timestamp:</Label>
                              <p className="col-span-3">{msg.timestamp}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right text-gray-600 col-span-1">Status:</Label>
                              <div className="col-span-3">{getStatusBadge(msg.status)}</div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="outline" className="hover:bg-slate-100">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No messages match your current filters.</p>
              <Button
                variant="link"
                className="text-brandDarkBlue mt-2"
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterStatus("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
