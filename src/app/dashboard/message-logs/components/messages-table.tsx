import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowUpDown, Eye, MessageSquare, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Message {
  id: string;
  type: "incoming" | "outgoing" | "auto-reply";
  contact: string;
  content: string;
  timestamp: string;
  status: "delivered" | "read" | "sent" | "failed";
  session: string;
}

interface MessagesTableProps {
  messages: Message[];
  onViewMessage?: (messageId: string) => void;
  onSortColumn?: (column: string) => void;
}

export function MessagesTable({ messages, onViewMessage, onSortColumn }: MessagesTableProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium">Total: {messages.length} pesan</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortColumn?.('type')}>
                  Tipe 
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => onSortColumn?.('contact')}>
                  Kontak
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center cursor-pointer" onClick={() => onSortColumn?.('content')}>
                  Konten
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="w-[150px]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortColumn?.('timestamp')}>
                  Waktu
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px] hidden lg:table-cell">Session</TableHead>
              <TableHead className="w-[80px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center">
                    <MessageSquare className="h-8 w-8 mb-2 opacity-30" />
                    <span>Tidak ada pesan yang ditemukan</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    {message.type === "incoming" ? (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30">
                        <ArrowDownCircle className="h-3 w-3" /> Masuk
                      </Badge>
                    ) : message.type === "outgoing" ? (
                      <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30">
                        <ArrowUpCircle className="h-3 w-3" /> Keluar
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-900/30">
                        Auto-Reply
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{message.contact}</TableCell>
                  <TableCell className="max-w-[300px] truncate hidden md:table-cell">
                    {message.content}
                  </TableCell>
                  <TableCell>
                    {new Date(message.timestamp).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    {message.status === "delivered" ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" /> Terkirim
                      </div>
                    ) : message.status === "read" ? (
                      <div className="flex items-center text-blue-600">
                        <Check className="h-4 w-4 mr-1" /> Dibaca
                      </div>
                    ) : message.status === "sent" ? (
                      <div className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 mr-1" /> Terkirim
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-1" /> Gagal
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="whitespace-nowrap">{message.session}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewMessage?.(message.id)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 