import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="rounded-xl shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <Icon className="h-5 w-5 text-brandDarkBlue" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-brandDarkBlue">{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
