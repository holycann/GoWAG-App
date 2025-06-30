import React from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface MessageLogsHeaderProps {
  title: string;
  description: string;
  onExport?: () => void;
  onRefresh?: () => void;
}

export function MessageLogsHeader({ 
  title, 
  description, 
  onExport, 
  onRefresh 
}: MessageLogsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
    </div>
  );
} 