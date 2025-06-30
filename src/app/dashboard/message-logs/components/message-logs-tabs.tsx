import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesTable } from "./messages-table";

interface Message {
  id: string;
  type: "incoming" | "outgoing" | "auto-reply";
  contact: string;
  content: string;
  timestamp: string;
  status: "delivered" | "read" | "sent" | "failed";
  session: string;
}

interface MessageLogsTabsProps {
  messages: Message[];
  onViewMessage?: (messageId: string) => void;
  onSortColumn?: (column: string) => void;
}

export function MessageLogsTabs({ messages, onViewMessage, onSortColumn }: MessageLogsTabsProps) {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Semua Pesan</TabsTrigger>
        <TabsTrigger value="incoming">Pesan Masuk</TabsTrigger>
        <TabsTrigger value="outgoing">Pesan Keluar</TabsTrigger>
        <TabsTrigger value="auto-reply">Auto-Reply</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <MessagesTable 
          messages={messages} 
          onViewMessage={onViewMessage}
          onSortColumn={onSortColumn}
        />
      </TabsContent>
      
      <TabsContent value="incoming">
        <MessagesTable 
          messages={messages.filter(m => m.type === 'incoming')}
          onViewMessage={onViewMessage}
          onSortColumn={onSortColumn}
        />
      </TabsContent>
      
      <TabsContent value="outgoing">
        <MessagesTable 
          messages={messages.filter(m => m.type === 'outgoing')}
          onViewMessage={onViewMessage}
          onSortColumn={onSortColumn}
        />
      </TabsContent>
      
      <TabsContent value="auto-reply">
        <MessagesTable 
          messages={messages.filter(m => m.type === 'auto-reply')}
          onViewMessage={onViewMessage}
          onSortColumn={onSortColumn}
        />
      </TabsContent>
    </Tabs>
  );
} 