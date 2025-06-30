import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickAction {
  label: string
  href: string
  icon: LucideIcon
}

interface QuickActionsGridProps {
  actions: QuickAction[]
  className?: string
}

export function QuickActionsGrid({ actions, className }: QuickActionsGridProps) {
  return (
    <Card className={cn("col-span-2 overflow-hidden border border-border/50 hover:border-border transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-muted/20">
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button 
              key={action.href}
              asChild 
              variant="outline" 
              className={cn(
                "h-24 flex flex-col gap-2 border-border/50 shadow-sm",
                "hover:border-primary/40 hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10 transition-all",
                "dark:border-border/30 dark:hover:border-primary/30"
              )}
            >
              <Link href={action.href}>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 