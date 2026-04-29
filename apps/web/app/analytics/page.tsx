"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { ProductivityChart } from "@workspace/ui/blocks/productivity-chart"
import { AIInsightCard } from "@workspace/ui/blocks/ai-insight-card"
import { Button } from "@workspace/ui/components/button"
import type { Insight } from "@workspace/ui/types/insight"

export default function AnalyticsPage() {
  const mockInsights: Insight[] = [
    {
      id: "i1",
      title: "Optimal Focus Window",
      description: "You are 42% more productive between 9 AM and 11 AM. Consider scheduling your most complex tasks during this time.",
      type: "productivity",
      priority: "medium",
      actionLabel: "Schedule Focus Session",
      createdAt: new Date()
    },
    {
      id: "i2",
      title: "Burnout Warning",
      description: "You've worked 6 days straight with an average of 8+ hours of focus time. Consider taking a full rest day to prevent burnout.",
      type: "health",
      priority: "high",
      actionLabel: "Plan Rest Day",
      createdAt: new Date()
    },
    {
      id: "i3",
      title: "Task Completion Trend",
      description: "Your task completion rate is up 15% this week compared to last week. Keep up the good work!",
      type: "general",
      priority: "low",
      createdAt: new Date()
    }
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Deep dive into your productivity metrics and AI insights.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium flex items-center justify-between">
            Total Focus Time
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </h3>
          <div className="mt-2 text-2xl font-bold">128h 14m</div>
          <p className="text-xs text-muted-foreground mt-1">+14% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium flex items-center justify-between">
            Tasks Completed
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="m5 12 5 5L20 7"></path></svg>
          </h3>
          <div className="mt-2 text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium flex items-center justify-between">
            Current Streaks
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
          </h3>
          <div className="mt-2 text-2xl font-bold">5 Active</div>
          <p className="text-xs text-muted-foreground mt-1">Top: Morning Meditation (12d)</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium flex items-center justify-between">
            Productivity Score
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </h3>
          <div className="mt-2 text-2xl font-bold text-primary">87/100</div>
          <p className="text-xs text-muted-foreground mt-1">Top 10% of users</p>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <ProductivityChart />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
          {mockInsights.map(insight => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  )
}
