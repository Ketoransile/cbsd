export type InsightType = "productivity" | "focus" | "health" | "general"
export type InsightPriority = "low" | "medium" | "high"

export interface Insight {
  id: string
  title: string
  description: string
  type: InsightType
  priority: InsightPriority
  actionLabel?: string
  actionUrl?: string
  createdAt: Date
}
