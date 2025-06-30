"use client"

import React from "react";
import { MessageLogsHeader, FilterCard, MessageLogsTabs } from "./components";

interface MessageLog {
  id: string;
  type: "incoming" | "outgoing" | "auto-reply";
  contact: string;
  content: string;
  timestamp: string;
  status: "delivered" | "read" | "sent" | "failed";
  session: string;
}

// Sample data for message logs
const messageLogs: MessageLog[] = [
  {
    id: "msg_123456",
    type: "incoming",
    contact: "+62 812-3456-7890",
    content: "Halo, saya ingin bertanya tentang produk Anda",
    timestamp: "2023-06-27T08:15:00",
    status: "delivered",
    session: "Primary WhatsApp",
  },
  {
    id: "msg_123457",
    type: "outgoing",
    contact: "+62 812-3456-7890",
    content: "Terima kasih telah menghubungi kami. Ada yang bisa saya bantu?",
    timestamp: "2023-06-27T08:16:30",
    status: "read",
    session: "Primary WhatsApp",
  },
  {
    id: "msg_123458",
    type: "incoming",
    contact: "+62 813-9876-5432",
    content: "Apakah pesanan saya sudah dikirim?",
    timestamp: "2023-06-27T09:22:15",
    status: "delivered",
    session: "Support WhatsApp",
  },
  {
    id: "msg_123459",
    type: "auto-reply",
    contact: "+62 813-9876-5432",
    content: "Terima kasih telah menghubungi kami. Tim kami akan segera membalas pesan Anda.",
    timestamp: "2023-06-27T09:22:18",
    status: "delivered",
    session: "Support WhatsApp",
  },
  {
    id: "msg_123460",
    type: "outgoing",
    contact: "+62 813-9876-5432",
    content: "Halo, bisa tolong berikan nomor pesanan Anda agar saya dapat memeriksakannya?",
    timestamp: "2023-06-27T09:25:45",
    status: "delivered",
    session: "Support WhatsApp",
  },
  {
    id: "msg_123461",
    type: "incoming",
    contact: "+62 856-1122-3344",
    content: "Saya tertarik dengan promo yang Anda tawarkan",
    timestamp: "2023-06-27T10:05:12",
    status: "delivered",
    session: "Marketing WhatsApp",
  },
  {
    id: "msg_123462",
    type: "outgoing",
    contact: "+62 856-1122-3344",
    content: "Terima kasih atas ketertarikan Anda. Berikut detail lengkap promo kami: [attachment: promo.pdf]",
    timestamp: "2023-06-27T10:10:33",
    status: "failed",
    session: "Marketing WhatsApp",
  },
  {
    id: "msg_123463",
    type: "outgoing",
    contact: "+62 856-1122-3344",
    content: "Mohon maaf, pesan sebelumnya gagal terkirim. Berikut detail promo kami...",
    timestamp: "2023-06-27T10:12:20",
    status: "sent",
    session: "Marketing WhatsApp",
  },
];

const availableSessions = [
  "Primary WhatsApp",
  "Support WhatsApp",
  "Marketing WhatsApp"
];

export default function MessageLogsPage() {
  // Functions to handle page actions
  const handleExport = () => {
    console.log("Exporting message logs");
  };
  
  const handleRefresh = () => {
    console.log("Refreshing message logs");
  };
  
  const handleApplyFilters = (filters: any) => {
    console.log("Applying filters:", filters);
  };
  
  const handleResetFilters = () => {
    console.log("Resetting filters");
  };
  
  const handleViewMessage = (messageId: string) => {
    console.log("Viewing message:", messageId);
  };
  
  const handleSortColumn = (column: string) => {
    console.log("Sorting by column:", column);
  };

  return (
    <div className="container mx-auto p-6">
      <MessageLogsHeader
        title="Message Logs"
        description="Riwayat pesan masuk dan keluar dari semua sesi"
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      <FilterCard
        sessions={availableSessions}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <MessageLogsTabs
        messages={messageLogs}
        onViewMessage={handleViewMessage}
        onSortColumn={handleSortColumn}
      />
    </div>
  );
} 