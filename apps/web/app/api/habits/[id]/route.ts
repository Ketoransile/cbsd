import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Habit from "@/models/Habit"
import { auth } from "@/auth";
import { headers } from "next/headers";

interface RouteContext {
  params: Promise<{ id: string }>
}

// PATCH /api/habits/:id — toggle completion or update habit
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { id } = await context.params
    const body = await request.json()

    const habit = await Habit.findOne({ _id: id, userId: session.user.id })
    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Handle completion toggle
    if (body.toggleDate !== undefined && body.completed !== undefined) {
      const dateStr = body.toggleDate as string
      habit.completionHistory.set(dateStr, body.completed as boolean)

      // Update streak
      if (body.completed) {
        habit.currentStreak = habit.currentStreak + 1
      } else {
        habit.currentStreak = Math.max(0, habit.currentStreak - 1)
      }
      habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak)
    }

    // Handle general updates
    if (body.name !== undefined) habit.name = body.name
    if (body.description !== undefined) habit.description = body.description
    if (body.frequency !== undefined) habit.frequency = body.frequency
    if (body.targetDays !== undefined) habit.targetDays = body.targetDays

    await habit.save()

    const history: Record<string, boolean> = {}
    if (habit.completionHistory instanceof Map) {
      habit.completionHistory.forEach((val: boolean, key: string) => {
        history[key] = val
      })
    }

    return NextResponse.json({
      id: habit._id.toString(),
      name: habit.name,
      description: habit.description ?? undefined,
      frequency: habit.frequency,
      targetDays: habit.targetDays,
      currentStreak: habit.currentStreak,
      longestStreak: habit.longestStreak,
      completionHistory: history,
      createdAt: habit.createdAt,
    })
  } catch (error) {
    console.error("PATCH /api/habits/:id error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
