import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, History, RefreshCw, X } from "lucide-react";

interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  status: 'success' | 'error';
  timestamp: string;
  icon: 'refresh' | 'check' | 'error';
}

interface IntegrationsActivityProps {
  events: ActivityEvent[];
  onViewHistory: () => void;
}

export function IntegrationsActivity({ events, onViewHistory }: IntegrationsActivityProps) {
  const getEventIcon = (icon: ActivityEvent['icon']) => {
    switch (icon) {
      case 'refresh':
        return <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'check':
        return <Check className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'error':
        return <X className="h-5 w-5 text-red-600 dark:text-red-400" />;
    }
  };

  const getEventStyles = (status: ActivityEvent['status']) => {
    return {
      badge: status === 'success'
        ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400"
        : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400",
      icon: status === 'success'
        ? "bg-green-100 dark:bg-green-900/20"
        : "bg-red-100 dark:bg-red-900/20"
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Activity</CardTitle>
        <CardDescription>
          Recent activities and sync events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  event.icon === 'refresh' 
                    ? "bg-blue-100 dark:bg-blue-900/20"
                    : getEventStyles(event.status).icon
                }`}>
                  {getEventIcon(event.icon)}
                </div>
                <div className="h-full w-px bg-border"></div>
              </div>
              <div className="pb-6">
                <div className="flex items-center">
                  <p className="font-medium">{event.title}</p>
                  <Badge className={`ml-2 ${getEventStyles(event.status).badge}`}>
                    {event.status === 'success' ? 'Success' : 'Error'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={onViewHistory}>
          <History className="mr-2 h-4 w-4" /> View Full History
        </Button>
      </CardFooter>
    </Card>
  );
} 