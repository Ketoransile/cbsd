"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb"
import Habit from "@/models/Habit"
import { revalidatePath } from "next/cache"
import type { Habit as HabitType, HabitFrequency } from "@workspace/ui/types/habit"

export async function getHabits(): Promise<HabitType[]> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return []

  await connectDB()

  const habits = await Habit.find({ userId: session.user.id })
    .sort({ createdAt: 1 })
    .lean()

  return habits.map((h) => {
    // Convert Mongoose Map or plain object to Record
    const history: Record<string, boolean> = {}
    if (h.completionHistory) {
      if (h.completionHistory instanceof Map) {
        h.completionHistory.forEach((val: boolean, key: string) => {
          history[key] = val
        })
      } else {
        Object.assign(history, h.completionHistory as Record<string, boolean>)
      }
    }

    return {
      id: h._id.toString(),
      name: h.name,
      description: h.description ?? undefined,
      frequency: h.frequency as HabitFrequency,
      targetDays: h.targetDays,
      currentStreak: h.currentStreak,
      longestStreak: h.longestStreak,
      completionHistory: history,
      createdAt: h.createdAt,
    }
  })
}

export async function createHabit(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  const name = formData.get("name") as string
  if (!name) return { error: "Name is required" }

  await connectDB()

  const description = (formData.get("description") as string) || undefined

  await Habit.create({
    name,
    description,
    frequency: "daily" as const,
    targetDays: [0, 1, 2, 3, 4, 5, 6],
    completionHistory: new Map<string, boolean>(),
    userId: session.user.id,
  })

  revalidatePath("/habits")
}

export async function toggleHabitCompletion(habitId: string, completed: boolean) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  await connectDB()

  const habit = await Habit.findOne({ _id: habitId, userId: session.user.id })
  if (!habit) return { error: "Habit not found" }

  const dateStr = new Date().toISOString().split("T")[0]!
  habit.completionHistory.set(dateStr, completed)

  // Update streak
  let streak = habit.currentStreak
  if (completed) {
    streak = habit.currentStreak + 1
  } else {
    streak = Math.max(0, habit.currentStreak - 1)
  }

  habit.currentStreak = streak
  habit.longestStreak = Math.max(habit.longestStreak, streak)

  await habit.save()

  revalidatePath("/habits")
}

