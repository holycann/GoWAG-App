import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RulesTable } from "./rules-table"
import { RuleAnalytics } from "./rule-analytics"

interface Rule {
  id: string
  name: string
  keywords?: string[]
  triggerType: 'keyword' | 'all' | 'first-time'
  responsePreview: string
  session: string
  schedule: {
    type: '24/7' | 'custom'
    time?: string
  }
  active: boolean
}

interface AnalyticsData {
  rules: {
    id: string
    name: string
    triggers: number
    responses: number
    ratio: number
    status: 'active' | 'inactive'
  }[]
  dailyStats: {
    date: string
    triggers: number
    responses: number
  }[]
}

interface AutoReplyTabsProps {
  activeRules: Rule[]
  inactiveRules: Rule[]
  analyticsData: AnalyticsData
  onEditRule?: (id: string) => void
  onDeleteRule?: (id: string) => void
}

export function AutoReplyTabs({
  activeRules,
  inactiveRules,
  analyticsData,
  onEditRule,
  onDeleteRule
}: AutoReplyTabsProps) {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-4">
        <TabsTrigger value="active">Active Rules</TabsTrigger>
        <TabsTrigger value="inactive">Inactive Rules</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active">
        <RulesTable
          title="Active Auto-Reply Rules"
          description="Aturan yang aktif saat ini akan membalas pesan sesuai konfigurasi"
          rules={activeRules}
          onEdit={onEditRule}
          onDelete={onDeleteRule}
        />
      </TabsContent>
      
      <TabsContent value="inactive">
        <RulesTable
          title="Inactive Auto-Reply Rules"
          description="Aturan yang tidak aktif tidak akan membalas pesan"
          rules={inactiveRules}
          onEdit={onEditRule}
          onDelete={onDeleteRule}
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <RuleAnalytics data={analyticsData} />
      </TabsContent>
    </Tabs>
  )
} 