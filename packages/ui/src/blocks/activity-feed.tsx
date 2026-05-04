"use client"

import * as React from "react"
import {
  CheckCircle2,
  PlusCircle,
  Flame,
  Timer,
  Info,
  Filter,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Separator } from "@workspace/ui/components/separator"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import type { Activity, ActivityType } from "@workspace/ui/types/activity"

/* ── type-to-visual config map ── */
const typeConfig: Record<
  ActivityType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  task_completed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Task Completed",
  },
  task_created: {
    icon: PlusCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Task Created",
  },
  habit_completed: {
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    label: "Habit",
  },
  focus_session: {
    icon: Timer,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    label: "Focus Session",
  },
  system: {
    icon: Info,
    color: "text-muted-foreground",
    bg: "bg-muted",
    label: "System",
  },
}

/* ── helpers ── */
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay === 1) return "Yesterday"
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function groupByDate(activities: Activity[]): Record<string, Activity[]> {
  const groups: Record<string, Activity[]> = {}
  for (const activity of activities) {
    const key = new Date(activity.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    if (!groups[key]) groups[key] = []
    groups[key]!.push(activity)
  }
  return groups
}

/* ── props ── */
interface ActivityFeedProps {
  activities: Activity[]
  isLoading?: boolean
  filterType?: ActivityType | "all"
  onFilterChange?: (type: ActivityType | "all") => void
  maxHeight?: string
}

/* ── loading skeleton ── */
function ActivityFeedSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/* ── single activity row ── */
function ActivityRow({ activity }: { activity: Activity }) {
  const config = typeConfig[activity.type] ?? typeConfig.system
  const Icon = config.icon

  return (
    <div className="flex items-start gap-3 py-3 group transition-colors rounded-lg px-2 hover:bg-muted/50">
      <Avatar className={`h-9 w-9 shrink-0 ${config.bg} mt-0.5`}>
        <AvatarFallback className="bg-transparent">
          <Icon className={`h-4 w-4 ${config.color}`} />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight truncate">
          {activity.title}
        </p>
        {activity.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {activity.description}
          </p>
        )}
        <Badge
          variant="outline"
          className="mt-1.5 text-[10px] uppercase tracking-wider font-semibold"
        >
          {config.label}
        </Badge>
      </div>
      <span className="text-[11px] text-muted-foreground whitespace-nowrap pt-0.5">
        {formatRelativeTime(new Date(activity.timestamp))}
      </span>
    </div>
  )
}

/* ── main block ── */
export function ActivityFeed({
  activities,
  isLoading,
  filterType = "all",
  onFilterChange,
  maxHeight = "600px",
}: ActivityFeedProps) {
  if (isLoading) return <ActivityFeedSkeleton />

  const filtered =
    filterType === "all"
      ? activities
      : activities.filter((a) => a.type === filterType)

  const grouped = groupByDate(filtered)
  const dateKeys = Object.keys(grouped)

  const filterOptions: { value: ActivityType | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "task_completed", label: "Completed" },
    { value: "task_created", label: "Created" },
    { value: "habit_completed", label: "Habits" },
    { value: "focus_session", label: "Focus" },
    { value: "system", label: "System" },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Activity Timeline</CardTitle>
          {onFilterChange && (
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
              {filterOptions.map((opt) => (
                <Button
                  key={opt.value}
                  variant={filterType === opt.value ? "default" : "ghost"}
                  size="sm"
                  className="h-7 text-xs px-2.5"
                  onClick={() => onFilterChange(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea style={{ maxHeight }}>
          {dateKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Info className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">
                No activity found.
              </p>
            </div>
          ) : (
            <div className="space-y-6 pr-4">
              {dateKeys.map((dateKey, idx) => (
                <div key={dateKey}>
                  {idx > 0 && <Separator className="mb-4" />}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    {dateKey}
                  </p>
                  <div className="space-y-0.5">
                    {grouped[dateKey]!.map((activity) => (
                      <ActivityRow key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
