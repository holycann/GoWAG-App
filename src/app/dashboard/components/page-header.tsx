import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4", className)}>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {action && (
        action.href ? (
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={action.href} className="flex items-center">
              {action.label}
              {action.icon || <ArrowRight className="ml-2 h-4 w-4" />}
            </Link>
          </Button>
        ) : (
          <Button 
            onClick={action.onClick} 
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center"
          >
            {action.label}
            {action.icon || <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        )
      )}
    </div>
  );
} 