import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCheck } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  billingCycle: string
  features: string[]
  popular?: boolean
}

interface PlanCardProps {
  plan: Plan
  isCurrentPlan?: boolean
  onSelect: (planId: string) => void
}

export function PlanCard({ plan, isCurrentPlan = false, onSelect }: PlanCardProps) {
  return (
    <Card className={`flex flex-col ${plan.popular ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{plan.name}</CardTitle>
            <div className="flex items-baseline mt-1">
              <div className="text-2xl font-bold">${plan.price}</div>
              <div className="text-sm text-muted-foreground ml-1">/ {plan.billingCycle}</div>
            </div>
          </div>
          {plan.popular && (
            <Badge>Popular</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start">
              <CheckCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isCurrentPlan ? (
          <Button className="w-full" variant="outline" disabled>
            Current Plan
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onSelect(plan.id)}>
            Select Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 