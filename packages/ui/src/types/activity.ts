export type ActivityType = "task_completed" | "task_created" | "habit_completed" | "focus_session" | "system"

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description?: string
  metadata?: Record<string, any>
  timestamp: Date
  userId?: string
}
