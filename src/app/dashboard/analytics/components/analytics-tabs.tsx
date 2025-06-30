import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageActivityChart } from "./message-activity-chart"
import { MessageTypesPieChart } from "./message-types-pie-chart"
import { DeliveryStatusChart } from "./delivery-status-chart"
import { MessagesByHourChart } from "./messages-by-hour-chart"
import { UserActivityChart } from "./user-activity-chart"
import { MetricCard } from "./metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MessageData {
  name: string
  sent: number
  delivered: number
  read: number
  responses: number
}

interface MessageTypeData {
  name: string
  value: number
}

interface DeliveryStatusData {
  name: string
  value: number
}

interface HourlyData {
  hour: string
  count: number
}

interface UserActivityData {
  name: string
  active: number
  new: number
}

interface MetricData {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
}

interface AnalyticsTabsProps {
  messageData: MessageData[]
  messageTypeData: MessageTypeData[]
  deliveryStatusData: DeliveryStatusData[]
  hourlyData: HourlyData[]
  userActivityData: UserActivityData[]
  performanceMetrics: MetricData[]
}

export function AnalyticsTabs({
  messageData,
  messageTypeData,
  deliveryStatusData,
  hourlyData,
  userActivityData,
  performanceMetrics
}: AnalyticsTabsProps) {
  return (
    <Tabs defaultValue="messages" className="mb-6">
      <TabsList>
        <TabsTrigger value="messages">Message Analytics</TabsTrigger>
        <TabsTrigger value="users">User Analytics</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="messages" className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <MessageActivityChart data={messageData} />
          <MessageTypesPieChart data={messageTypeData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DeliveryStatusChart data={deliveryStatusData} />
          <div className="lg:col-span-2">
            <MessagesByHourChart data={hourlyData} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="users" className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <UserActivityChart data={userActivityData} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Key user engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Avg. Session Duration"
                    value="4m 32s"
                    change="+12% from last period"
                    trend="up"
                  />
                  <MetricCard
                    title="Messages per User"
                    value="8.3"
                    change="+5% from last period"
                    trend="up"
                  />
                  <MetricCard
                    title="Retention Rate"
                    value="76%"
                    change="-3% from last period"
                    trend="down"
                  />
                  <MetricCard
                    title="New User Growth"
                    value="12%"
                    change="+2% from last period"
                    trend="up"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="performance" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {performanceMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
            />
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>
              API response times and system metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              Performance chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 