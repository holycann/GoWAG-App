"use client";

import React from "react";
import { StatCard } from "./stat-card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string | number;
  className?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(`grid gap-6 ${gridCols[columns]}`, className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          trendValue={stat.trendValue}
          className={cn(
            "border-l-4 hover:shadow-lg transition-all",
            stat.className,
            !stat.className && [
              index % 4 === 0 && "border-primary hover:shadow-primary/5 dark:hover:shadow-primary/10",
              index % 4 === 1 && "border-secondary hover:shadow-secondary/5 dark:hover:shadow-secondary/10",
              index % 4 === 2 && "border-accent hover:shadow-accent/5 dark:hover:shadow-accent/10",
              index % 4 === 3 && "border-muted hover:shadow-muted/5 dark:hover:shadow-muted/10",
            ]
          )}
        />
      ))}
    </div>
  );
} 