import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface UserActivityData {
  name: string
  active: number
  new: number
}

interface UserActivityChartProps {
  data: UserActivityData[]
  title?: string
  description?: string
  height?: number
  activeColor?: string
  newColor?: string
}

export function UserActivityChart({
  data,
  title = "User Activity",
  description = "Active and new users by day",
  height = 350,
  activeColor = "#8884d8",
  newColor = "#82ca9d"
}: UserActivityChartProps) {
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="active" fill={activeColor} name="Active Users" />
            <Bar dataKey="new" fill={newColor} name="New Users" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 