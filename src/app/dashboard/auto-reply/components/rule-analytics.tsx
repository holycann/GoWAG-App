import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

interface RuleAnalyticsProps {
  data: AnalyticsData
}

export function RuleAnalytics({ data }: RuleAnalyticsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto-Reply Performance</CardTitle>
          <CardDescription>
            Effectiveness of your auto-reply rules over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dailyStats}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="triggers" name="Triggers" fill="#1E40AF" />
                <Bar dataKey="responses" name="Responses" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rule Performance</CardTitle>
          <CardDescription>
            Statistics for individual auto-reply rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Trigger Count</TableHead>
                <TableHead>Response Count</TableHead>
                <TableHead>Success Ratio</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.triggers}</TableCell>
                  <TableCell>{rule.responses}</TableCell>
                  <TableCell>{(rule.ratio * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    {rule.status === 'active' ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 