import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface FeedbackHeaderProps {
  title: string;
  description: string;
  onSubmitFeedback: () => void;
}

export function FeedbackHeader({
  title,
  description,
  onSubmitFeedback
}: FeedbackHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <Button onClick={onSubmitFeedback}>
        <PlusCircle className="mr-2 h-4 w-4" /> Submit Feedback
      </Button>
    </div>
  );
}
