"use client"

import * as React from "react"
import { Flame, Check, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Button } from "@workspace/ui/components/button"
import type { Habit } from "@workspace/ui/types/habit"

interface HabitTrackerProps {
  habits?: Habit[]
  onToggleHabit?: (habitId: string, completed: boolean) => void
}

export function HabitTracker({ habits = [], onToggleHabit }: HabitTrackerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  
  // Format date to YYYY-MM-DD
  const dateString = selectedDate.toISOString().split('T')[0]
  
  // Mock calculations
  const totalHabits = habits.length
  const completedHabits = habits.filter(h => h.completionHistory?.[dateString]).length
  const completionPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Daily Habits</CardTitle>
          <CardDescription>Track your routines</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex gap-1 items-center font-normal">
            <CalendarIcon className="h-3 w-3" />
            Today
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Daily Progress</span>
            <span>{completedHabits} / {totalHabits}</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No habits scheduled for today.
            </div>
          ) : (
            habits.map((habit) => {
              const isCompleted = habit.completionHistory?.[dateString] || false
              
              return (
                <div 
                  key={habit.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    isCompleted ? "bg-muted/50 border-muted" : "bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`habit-${habit.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) => 
                        onToggleHabit?.(habit.id, checked === true)
                      }
                      className="h-5 w-5 rounded-full data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <div className="grid gap-0.5">
                      <label 
                        htmlFor={`habit-${habit.id}`}
                        className={`text-sm font-medium leading-none cursor-pointer ${
                          isCompleted ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {habit.name}
                      </label>
                      {habit.description && (
                        <p className={`text-xs ${isCompleted ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex gap-1 items-center bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0">
                      <Flame className="h-3 w-3 fill-orange-500" />
                      {habit.currentStreak}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
