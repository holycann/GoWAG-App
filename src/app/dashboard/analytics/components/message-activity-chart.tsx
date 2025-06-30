import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface MessageData {
  name: string
  sent: number
  delivered: number
  read: number
  responses: number
}

interface MessageActivityChartProps {
  data: MessageData[]
  title?: string
  description?: string
  height?: number
}

export function MessageActivityChart({
  data,
  title = "Message Activity",
  description = "Message sent, delivered, read, and responses",
  height = 350
}: MessageActivityChartProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="#8884d8"
              strokeWidth={2}
              name="Sent"
            />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Delivered"
            />
            <Line
              type="monotone"
              dataKey="read"
              stroke="#ffc658"
              strokeWidth={2}
              name="Read"
            />
            <Line
              type="monotone"
              dataKey="responses"
              stroke="#ff7300"
              strokeWidth={2}
              name="Responses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 