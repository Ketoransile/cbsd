"use client"

import * as React from "react"
import { format, subDays, startOfWeek, addDays, getDay } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"

interface StreakCalendarProps {
  data?: Record<string, number> // YYYY-MM-DD -> completion level (0-4)
  weeks?: number
  title?: string
  description?: string
}

export function StreakCalendar({ 
  data = {}, 
  weeks = 12,
  title = "Consistency Heatmap",
  description = "Your habit completion over time"
}: StreakCalendarProps) {
  // Generate calendar data
  const today = new Date()
  const startDate = startOfWeek(subDays(today, weeks * 7 - 1), { weekStartsOn: 0 })
  
  const days = Array.from({ length: weeks * 7 }).map((_, i) => {
    const date = addDays(startDate, i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const level = data[dateStr] || 0
    return { date, dateStr, level }
  })

  // Group by weeks
  const weeksData: { date: Date; dateStr: string; level: number }[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeksData.push(days.slice(i, i + 7))
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return "bg-primary"
      case 3: return "bg-primary/80"
      case 2: return "bg-primary/60"
      case 1: return "bg-primary/30"
      default: return "bg-muted"
    }
  }

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 4: return "Exceptional"
      case 3: return "Great"
      case 2: return "Good"
      case 1: return "Started"
      default: return "No activity"
    }
  }

  const monthLabels = React.useMemo(() => {
    const labels: { month: string; colIndex: number }[] = []
    let lastMonth = -1

    weeksData.forEach((week, i) => {
      if (week[0]) {
        const month = week[0].date.getMonth()
        if (month !== lastMonth && i < weeksData.length - 1) {
          labels.push({ month: format(week[0].date, 'MMM'), colIndex: i })
          lastMonth = month
        }
      }
    })

    return labels
  }, [weeksData])

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {/* Month labels */}
          <div className="flex text-xs text-muted-foreground ml-6 relative h-4">
            {monthLabels.map(({ month, colIndex }) => (
              <div 
                key={`${month}-${colIndex}`} 
                className="absolute"
                style={{ left: `${(colIndex / weeks) * 100}%` }}
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-[10px] text-muted-foreground h-[112px] py-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid */}
            <TooltipProvider delayDuration={100}>
              <div className="flex flex-1 gap-1">
                {weeksData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                    {week.map((day, dayIndex) => (
                      <Tooltip key={day.dateStr}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-full aspect-square rounded-sm ${getLevelColor(day.level)} transition-colors hover:ring-2 hover:ring-ring hover:ring-offset-1 hover:ring-offset-background`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold text-sm">
                            {format(day.date, 'MMM d, yyyy')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getLevelLabel(day.level)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mt-2">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
