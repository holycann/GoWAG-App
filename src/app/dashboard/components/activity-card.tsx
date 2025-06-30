import React from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityData {
  name: string
  messages: number
}

interface ActivityCardProps {
  data: ActivityData[]
  totalWeek: number
  weeklyAverage: number
  className?: string
}

export function ActivityCard({ data, totalWeek, weeklyAverage, className }: ActivityCardProps) {
  return (
    <Card className={cn("md:col-span-2 overflow-hidden border border-border/50 hover:border-border transition-all", className)}>
      <CardHeader className="bg-muted/20">
        <CardTitle>Message Activity</CardTitle>
        <CardDescription>
          Total messages processed this week
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[250px] flex items-center justify-center bg-muted/10 rounded-md">
          <div className="text-center">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">
              Message chart visualization
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border/50 bg-muted/5 p-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Total This Week</div>
          <div className="text-2xl font-bold">{totalWeek}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground text-right">Weekly Average</div>
          <div className="text-2xl font-bold text-right">{weeklyAverage}</div>
        </div>
      </CardFooter>
    </Card>
  )
} 