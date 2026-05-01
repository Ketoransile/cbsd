"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { HabitTracker } from "@workspace/ui/blocks/habit-tracker"
import { StreakCalendar } from "@workspace/ui/blocks/streak-calendar"
import { Button } from "@workspace/ui/components/button"
import type { Habit } from "@workspace/ui/types/habit"
import { toggleHabitCompletion } from "@/lib/actions/habits"

interface HabitsPageProps {
  initialHabits: Habit[]
}

export default function HabitsPageClient({ initialHabits }: HabitsPageProps) {
  const [habits, setHabits] = React.useState<Habit[]>(initialHabits)

  // Generate mock streak data for the visualization for now
  const generateMockStreakData = () => {
    const data: Record<string, number> = {}
    const today = new Date()
    for (let i = 0; i < 90; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      data[dateStr] = Math.floor(Math.random() * 5)
    }
    return data
  }

  const handleToggleHabit = async (id: string, completed: boolean) => {
    const dateStr = new Date().toISOString().split('T')[0]
    
    // Optimistic update
    setHabits(current => current.map(h => {
      if (h.id === id) {
        return {
          ...h,
          completionHistory: {
            ...h.completionHistory,
            [dateStr]: completed
          }
        }
      }
      return h
    }))

    // Server update
    await toggleHabitCompletion(id, completed)
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Habits</h2>
          <p className="text-muted-foreground">
            Build consistency and track your daily routines.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Habit
          </Button>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-12">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <StreakCalendar data={generateMockStreakData()} weeks={16} />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Total Habits Tracked</h3>
              <div className="mt-2 text-3xl font-bold">{habits.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active routines</p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Overall Completion</h3>
              <div className="mt-2 text-3xl font-bold text-primary">--</div>
              <p className="text-xs text-muted-foreground mt-1">Today</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4">
          <HabitTracker habits={habits} onToggleHabit={handleToggleHabit} />
        </div>
      </div>
    </div>
  )
}
