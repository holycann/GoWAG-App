"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { useSubscription } from "@/context/subscription-context";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UsageMeterProps {
  limitType: string;
  currentUsage: number;
  label?: string;
  className?: string;
  showIcon?: boolean;
  showTooltip?: boolean;
  tooltipContent?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function UsageMeter({
  limitType,
  currentUsage,
  label,
  className,
  showIcon = true,
  showTooltip = true,
  tooltipContent,
  size = "md",
  animate = true
}: UsageMeterProps) {
  const { getLimit, getUsagePercentage } = useSubscription();
  
  // Get limit and calculate percentage
  const limit = getLimit(limitType);
  const percentage = getUsagePercentage(limitType, currentUsage);
  
  // Determine color based on usage percentage
  const getColorClass = () => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-warning";
    return "bg-primary";
  };
  
  // Determine icon based on usage percentage
  const getIcon = () => {
    if (percentage >= 90) return <AlertCircle className="h-4 w-4 text-destructive" />;
    if (percentage >= 75) return <Info className="h-4 w-4 text-warning" />;
    return <CheckCircle2 className="h-4 w-4 text-primary" />;
  };
  
  // Determine height based on size
  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1";
      case "lg": return "h-3";
      default: return "h-2";
    }
  };
  
  // Format the usage text
  const usageText = limit === -1 
    ? `${currentUsage} / Unlimited` 
    : `${currentUsage} / ${limit}`;
  
  // Format the tooltip content
  const tooltipText = tooltipContent || 
    `${label || limitType} usage: ${percentage.toFixed(1)}% (${usageText})`;
  
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">{label}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-foreground">{usageText}</span>
            {showIcon && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    {getIcon()}
                  </TooltipTrigger>
                  {showTooltip && (
                    <TooltipContent>
                      <p>{tooltipText}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      )}
      
      <div className="relative">
        <Progress
          value={percentage}
          className={cn(
            getHeight(),
            "bg-muted"
          )}
          // Use a custom style for the indicator via CSS variables
          style={{
            "--progress-indicator-color": percentage >= 90 ? "var(--destructive)" : 
                                         percentage >= 75 ? "var(--warning)" : 
                                         "var(--primary)"
          } as React.CSSProperties}
        />
        
        {animate && percentage > 0 && (
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-white/30"
            initial={{ width: 0 }}
            animate={{ 
              width: "100%", 
              transition: { 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              } 
            }}
            style={{ 
              clipPath: `inset(0 ${100 - percentage}% 0 0)` 
            }}
          />
        )}
      </div>
    </div>
  );
}

// Component for displaying multiple usage metrics
interface UsageMetricsProps {
  metrics: Array<{
    limitType: string;
    currentUsage: number;
    label: string;
  }>;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UsageMetrics({
  metrics,
  className,
  size = "md"
}: UsageMetricsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {metrics.map((metric) => (
        <UsageMeter
          key={metric.limitType}
          limitType={metric.limitType}
          currentUsage={metric.currentUsage}
          label={metric.label}
          size={size}
        />
      ))}
    </div>
  );
} 