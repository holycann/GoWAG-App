import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCheck } from "lucide-react"

interface Plan {
  name: string
  price: number
  billingCycle: string
  status: string
  nextBillingDate: string
  features: string[]
}

interface CurrentPlanCardProps {
  plan: Plan
}

export function CurrentPlanCard({ plan }: CurrentPlanCardProps) {
  return (
    <Card className="col-span-3 md:col-span-2">
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <div className="flex items-center">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
            <CheckCheck className="mr-1 h-3 w-3" /> Active
          </Badge>
          <span className="text-sm text-muted-foreground ml-2">
            Next billing on {new Date(plan.nextBillingDate).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-6">
          <div className="text-3xl font-bold">${plan.price}</div>
          <div className="text-muted-foreground ml-2">/ {plan.billingCycle}</div>
        </div>
        <div className="bg-muted p-4 rounded-md mb-6">
          <div className="text-lg font-medium mb-2">{plan.name} Plan</div>
          <ul className="space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="text-sm flex items-center">
                <CheckCheck className="h-4 w-4 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 