import { ProductivityChart } from "@workspace/ui/blocks/productivity-chart"
import { HabitTracker } from "@workspace/ui/blocks/habit-tracker"
import { AIInsightCard } from "@workspace/ui/blocks/ai-insight-card"
import type { Insight } from "@workspace/ui/types/insight"

export default function DashboardPage() {
  const mockHabits = [
    {
      id: "1",
      name: "Morning Meditation",
      description: "10 minutes of mindfulness",
      frequency: "daily" as const,
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      currentStreak: 12,
      longestStreak: 15,
      completionHistory: { [new Date().toISOString().split('T')[0]]: true },
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Read Technical Book",
      description: "1 chapter per day",
      frequency: "daily" as const,
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      currentStreak: 4,
      longestStreak: 21,
      completionHistory: {},
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Exercise",
      description: "30 mins cardio or strength",
      frequency: "daily" as const,
      targetDays: [0, 1, 2, 3, 4, 5, 6],
      currentStreak: 0,
      longestStreak: 45,
      completionHistory: {},
      createdAt: new Date(),
    }
  ]

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
      title: "Break Recommendation",
      description: "You've been working for 90 minutes straight. Taking a 5-minute break now will help maintain your cognitive endurance.",
      type: "health",
      priority: "high",
      actionLabel: "Take a Break",
      createdAt: new Date()
    }
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's your daily productivity summary.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-6">
          <ProductivityChart />
          <div className="grid gap-6 md:grid-cols-2">
            {mockInsights.map(insight => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
        
        <div className="col-span-3 space-y-6">
          <HabitTracker habits={mockHabits} />
        </div>
      </div>
    </div>
  )
}
