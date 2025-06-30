import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

interface DataPoint {
  time: string
  usage: number
  [key: string]: string | number
}

interface ResourceChartProps {
  title: string
  description: string
  data: DataPoint[]
  dataKey: string
  color: string
  unit: string
  height?: number
}

export function ResourceChart({
  title,
  description,
  data,
  dataKey,
  color,
  unit,
  height = 200
}: ResourceChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis unit={unit} />
              <Tooltip 
                formatter={(value) => [`${value}${unit}`, dataKey]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke={color}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name={dataKey}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 