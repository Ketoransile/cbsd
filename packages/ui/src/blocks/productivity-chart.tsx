"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"

const weeklyData = [
  { day: "Mon", focus: 120, tasks: 5 },
  { day: "Tue", focus: 150, tasks: 8 },
  { day: "Wed", focus: 90, tasks: 4 },
  { day: "Thu", focus: 180, tasks: 10 },
  { day: "Fri", focus: 160, tasks: 7 },
  { day: "Sat", focus: 60, tasks: 2 },
  { day: "Sun", focus: 45, tasks: 1 },
]

const monthlyData = [
  { week: "Week 1", focus: 600, tasks: 25 },
  { week: "Week 2", focus: 750, tasks: 30 },
  { week: "Week 3", focus: 580, tasks: 22 },
  { week: "Week 4", focus: 800, tasks: 35 },
]

export function ProductivityChart() {
  const [metric, setMetric] = React.useState("focus")

  const chartConfig = {
    focus: {
      label: "Focus Time (mins)",
      color: "hsl(var(--primary))",
    },
    tasks: {
      label: "Tasks Completed",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Productivity Trends</CardTitle>
          <CardDescription>View your focus time and completed tasks</CardDescription>
        </div>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="focus">Focus Time</SelectItem>
            <SelectItem value="tasks">Tasks Completed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-4 grid w-full max-w-sm grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig[metric as keyof typeof chartConfig].color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartConfig[metric as keyof typeof chartConfig].color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey={metric} 
                  stroke={chartConfig[metric as keyof typeof chartConfig].color} 
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey={metric} 
                  fill={chartConfig[metric as keyof typeof chartConfig].color} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
