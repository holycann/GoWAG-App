import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface UsageMetric {
  used: number
  total: number | string
  percentage: number
}

interface UsageCardProps {
  usageData: {
    messages: UsageMetric
    contacts: UsageMetric
    storage: UsageMetric
    teamMembers: UsageMetric
  }
}

export function UsageCard({ usageData }: UsageCardProps) {
  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Messages Used</Label>
            <div className="text-sm">
              {usageData.messages.used.toLocaleString()} / {usageData.messages.total.toLocaleString()} ({usageData.messages.percentage}%)
            </div>
          </div>
          <Progress value={usageData.messages.percentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>Storage</Label>
            <div className="text-sm">
              {usageData.storage.used} GB / {usageData.storage.total} GB ({usageData.storage.percentage}%)
            </div>
          </div>
          <Progress value={usageData.storage.percentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>Team Members</Label>
            <div className="text-sm">
              {usageData.teamMembers.used} / {usageData.teamMembers.total} ({usageData.teamMembers.percentage}%)
            </div>
          </div>
          <Progress value={usageData.teamMembers.percentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>Contacts</Label>
            <div className="text-sm">
              {usageData.contacts.used.toLocaleString()} / {usageData.contacts.total}
            </div>
          </div>
          {typeof usageData.contacts.total === 'number' && (
            <Progress value={usageData.contacts.percentage} className="h-2" />
          )}
          {typeof usageData.contacts.total === 'string' && (
            <div className="text-xs text-muted-foreground">Unlimited contacts available</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 