import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  footer,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden border border-border/50 hover:border-border transition-all", className)}>
      <CardHeader className={cn("flex flex-row items-center justify-between bg-muted/20", headerClassName)}>
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {Icon && (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent className={cn("p-6", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("border-t border-border/50 bg-muted/5 p-4", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
} 