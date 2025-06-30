import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts"

interface MessageTypeData {
  name: string
  value: number
}

interface MessageTypesPieChartProps {
  data: MessageTypeData[]
  title?: string
  description?: string
  height?: number
  colors?: string[]
}

export function MessageTypesPieChart({
  data,
  title = "Message Types",
  description = "Distribution by content type",
  height = 250,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]
}: MessageTypesPieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 