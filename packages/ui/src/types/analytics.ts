export interface FocusSession {
  id: string
  startTime: Date
  endTime?: Date
  durationMinutes: number
  completed: boolean
  taskIds?: string[]
}

export interface AnalyticsData {
  dailyFocusTime: number // in minutes
  weeklyFocusTime: number
  tasksCompletedToday: number
  activeHabitsCount: number
  productivityScore: number // 0-100
  recentSessions: FocusSession[]
}
