import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ApiUsageExample {
  title: string
  description: string
  code: string
}

interface ApiUsageCardProps {
  title: string
  description: string
  examples: ApiUsageExample[]
}

export function ApiUsageCard({ title, description, examples }: ApiUsageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {examples.map((example, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-2">{example.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {example.description}
              </p>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm whitespace-pre-wrap">
                  {example.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 