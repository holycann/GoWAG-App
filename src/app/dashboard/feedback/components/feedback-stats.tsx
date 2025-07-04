import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BugIcon, Clock, CheckCircle } from "lucide-react";

interface FeedbackItem {
  id: string;
  status: string;
  type: string;
  // ...other properties
}

interface FeedbackStatsProps {
  feedbackItems: FeedbackItem[];
}

export function FeedbackStats({ feedbackItems }: FeedbackStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BugIcon className="mr-2 h-4 w-4 text-primary" /> Open Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {feedbackItems.filter(item => item.status === "open").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Active bugs and requests
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="mr-2 h-4 w-4 text-primary" /> In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {feedbackItems.filter(item => item.status === "in-progress" || item.status === "under-review").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Being worked on or reviewed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Resolved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {feedbackItems.filter(item => item.status === "resolved").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Issues fixed and closed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
