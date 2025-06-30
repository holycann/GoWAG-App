import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BugIcon,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  ThumbsUp,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

interface FeedbackCardProps {
  item: {
    id: string;
    type: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    user: {
      name: string;
      avatar: string | null;
    };
    responses: Array<{
      id: string;
      content: string;
      createdAt: string;
      isStaff: boolean;
      user: {
        name: string;
        avatar: string | null;
      };
    }>;
  };
  onView: () => void;
}

export function FeedbackCard({ item, onView }: FeedbackCardProps) {
  const getStatusBadgeStyles = (status: string) => {
    const styles = {
      open: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
      "in-progress":
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
      resolved:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400",
      "under-review":
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
      planned:
        "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400",
    };
    return styles[status as keyof typeof styles] || "";
  };

  const getPriorityBadgeStyles = (priority: string) => {
    const styles = {
      critical:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      high: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400",
      medium:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
      low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400",
    };
    return styles[priority as keyof typeof styles] || "";
  };

  return (
    <Card onClick={onView} className="cursor-pointer hover:bg-accent/5">
      <div
        className={`h-1.5 w-full ${
          item.priority === "critical"
            ? "bg-red-500"
            : item.priority === "high"
            ? "bg-orange-500"
            : item.priority === "medium"
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {item.type === "bug" ? (
              <BugIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
            ) : item.type === "feature" ? (
              <Lightbulb className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            ) : (
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
            <CardTitle>{item.title}</CardTitle>
          </div>
          <Badge className={getStatusBadgeStyles(item.status)}>
            {item.status === "open" ? (
              <>
                <AlertCircle className="mr-1 h-3 w-3" /> Open
              </>
            ) : item.status === "in-progress" ? (
              <>
                <RefreshCw className="mr-1 h-3 w-3" /> In Progress
              </>
            ) : item.status === "resolved" ? (
              <>
                <CheckCircle className="mr-1 h-3 w-3" /> Resolved
              </>
            ) : item.status === "under-review" ? (
              <>
                <Clock className="mr-1 h-3 w-3" /> Under Review
              </>
            ) : item.status === "planned" ? (
              <>
                <Clock className="mr-1 h-3 w-3" /> Planned
              </>
            ) : (
              item.status
            )}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{item.category}</Badge>
          <Badge
            variant="outline"
            className={getPriorityBadgeStyles(item.priority)}
          >
            {item.priority} priority
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={item.user.avatar || ""} />
            <AvatarFallback>
              {item.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {item.user.name}
          </span>
        </div>

        {item.responses.length > 0 && (
          <div className="space-y-3 mt-4">
            <div className="h-px w-full bg-border"></div>
            {item.responses.map((response) => (
              <div
                key={response.id}
                className="ml-4 mt-2 pl-3 border-l-2 border-muted"
              >
                <p className="text-sm">{response.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={response.user.avatar || ""} />
                    <AvatarFallback>
                      {response.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">
                    {response.user.name}
                    {response.isStaff && (
                      <Badge
                        variant="outline"
                        className="ml-1 text-[10px] py-0 h-4"
                      >
                        Staff
                      </Badge>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-7">
            <ThumbsUp className="mr-1.5 h-3.5 w-3.5" /> Helpful
          </Button>
          <Button variant="ghost" size="sm" className="h-7">
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Comment
          </Button>
        </div>
        {item.status !== "resolved" && (
          <Button variant="outline" size="sm" className="h-7">
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Mark as Resolved
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
