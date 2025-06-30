"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: LucideIcon;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

interface ActionButtonsProps {
  actions: ActionButton[];
  columns?: 2 | 3 | 4 | 6;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ActionButtons({ actions, columns = 3, size = "default", className }: ActionButtonsProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
  };

  return (
    <div className={cn(`grid gap-4 ${gridCols[columns]}`, className)}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        const buttonContent = (
          <>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{action.label}</span>
          </>
        );

        return action.href ? (
          <Button
            key={index}
            asChild
            variant={action.variant || "outline"}
            size={size}
            className={cn(
              "h-24 flex flex-col gap-2 border-border/50 shadow-sm",
              "hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10 transition-all",
              "dark:border-border/30 dark:hover:border-primary/30"
            )}
          >
            <Link href={action.href}>
              {buttonContent}
            </Link>
          </Button>
        ) : (
          <Button
            key={index}
            variant={action.variant || "outline"}
            size={size}
            onClick={action.onClick}
            className={cn(
              "h-24 flex flex-col gap-2 border-border/50 shadow-sm",
              "hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10 transition-all",
              "dark:border-border/30 dark:hover:border-primary/30"
            )}
          >
            {buttonContent}
          </Button>
        );
      })}
    </div>
  );
} 