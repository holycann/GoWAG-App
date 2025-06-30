import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string | number
  className?: string
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  trendValue,
  className 
}: StatCardProps) {
  return (
    <Card className={cn("rounded-xl overflow-hidden transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trend === "up" ? "text-green-600 dark:text-green-400" : 
              trend === "down" ? "text-red-600 dark:text-red-400" : 
              "text-gray-500"
            )}>
              {trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : 
               trend === "down" ? <ArrowDown className="h-3 w-3 mr-1" /> : null}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
