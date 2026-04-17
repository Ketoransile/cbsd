export type HabitFrequency = "daily" | "weekly" | "monthly"

export interface Habit {
  id: string
  name: string
  description?: string
  frequency: HabitFrequency
  targetDays: number[] // 0-6 for daily (Sunday-Saturday)
  currentStreak: number
  longestStreak: number
  completionHistory: Record<string, boolean> // date string (YYYY-MM-DD) -> completed
  createdAt: Date
}
