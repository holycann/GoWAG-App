import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

interface HourlyData {
  hour: string
  count: number
}

interface MessagesByHourChartProps {
  data: HourlyData[]
  title?: string
  description?: string
  height?: number
  barColor?: string
}

export function MessagesByHourChart({
  data,
  title = "Messages by Hour",
  description = "Message distribution throughout the day",
  height = 350,
  barColor = "#8884d8"
}: MessagesByHourChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={barColor} name="Messages" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 