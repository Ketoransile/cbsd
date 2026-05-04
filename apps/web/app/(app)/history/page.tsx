"use client"

import * as React from "react"
import { Calendar, Clock, TrendingUp } from "lucide-react"

import { ActivityFeed } from "@workspace/ui/blocks/activity-feed"
import type { Activity, ActivityType } from "@workspace/ui/types/activity"

/* ── mock data generator ── */
function generateMockActivities(): Activity[] {
  const now = new Date()

  const templates: Omit<Activity, "id" | "timestamp">[] = [
    {
      type: "task_completed",
      title: "Completed: Refactor auth middleware",
      description: "Migrated session validation to Better Auth middleware pattern.",
    },
    {
      type: "focus_session",
      title: "Focus session finished — 25 min",
      description: "Deep work on dashboard component optimization.",
    },
    {
      type: "habit_completed",
      title: "Morning Meditation completed",
      description: "12-day streak maintained!",
    },
    {
      type: "task_created",
      title: "Created: Implement activity history page",
      description: "Build the ActivityFeed block and wire it into the History route.",
    },
    {
      type: "task_completed",
      title: "Completed: Fix MongoDB connection pooling",
      description: "Resolved hot-reload connection leak with cached singleton.",
    },
    {
      type: "focus_session",
      title: "Focus session finished — 50 min",
      description: "Extended Pomodoro session for API route integration.",
    },
    {
      type: "habit_completed",
      title: "Read 30 minutes completed",
    },
    {
      type: "system",
      title: "Daily productivity report generated",
      description: "Your productivity score today: 87/100. Top 10% of users.",
    },
    {
      type: "task_completed",
      title: "Completed: Add StreakCalendar memoization",
      description: "Wrapped date computations in useMemo to cut re-renders by 60%.",
    },
    {
      type: "habit_completed",
      title: "Exercise 30 min completed",
      description: "5-day streak maintained.",
    },
    {
      type: "task_created",
      title: "Created: Export analytics report as PDF",
    },
    {
      type: "focus_session",
      title: "Focus session finished — 25 min",
      description: "Working on Habits page layout polish.",
    },
    {
      type: "task_completed",
      title: "Completed: Integrate Google OAuth flow",
      description: "Better Auth Google provider configured and tested end-to-end.",
    },
    {
      type: "system",
      title: "Weekly summary available",
      description: "You completed 34 tasks and logged 18h of focus time this week.",
    },
    {
      type: "habit_completed",
      title: "Drink 8 glasses of water completed",
    },
  ]

  return templates.map((t, i) => ({
    ...t,
    id: `act-${i + 1}`,
    timestamp: new Date(now.getTime() - i * 3_600_000 * (1 + Math.random() * 3)),
  }))
}

/* ── stat card ── */
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-sm font-medium flex items-center justify-between">
        {label}
        <Icon className="h-4 w-4 text-muted-foreground" />
      </h3>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}

/* ── page ── */
export default function HistoryPage() {
  const [filterType, setFilterType] = React.useState<ActivityType | "all">("all")
  const activities = React.useMemo(() => generateMockActivities(), [])

  const stats = React.useMemo(() => {
    const tasksDone = activities.filter((a) => a.type === "task_completed").length
    const focusSessions = activities.filter((a) => a.type === "focus_session").length
    const habitsLogged = activities.filter((a) => a.type === "habit_completed").length
    return { tasksDone, focusSessions, habitsLogged, total: activities.length }
  }, [activities])

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">History</h2>
          <p className="text-muted-foreground">
            Browse your complete activity timeline across tasks, habits, and focus sessions.
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Total Activities"
          value={String(stats.total)}
          sub="All time"
        />
        <StatCard
          icon={Calendar}
          label="Tasks Completed"
          value={String(stats.tasksDone)}
          sub="Across all projects"
        />
        <StatCard
          icon={Clock}
          label="Focus Sessions"
          value={String(stats.focusSessions)}
          sub="Pomodoro cycles logged"
        />
        <StatCard
          icon={Calendar}
          label="Habits Logged"
          value={String(stats.habitsLogged)}
          sub="Daily completions"
        />
      </div>

      {/* Feed */}
      <ActivityFeed
        activities={activities}
        filterType={filterType}
        onFilterChange={setFilterType}
        maxHeight="540px"
      />
    </div>
  )
}
