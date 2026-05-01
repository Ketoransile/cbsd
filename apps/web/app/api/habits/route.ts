import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Habit from "@/models/Habit"
import { auth } from "@/auth";
import { headers } from "next/headers";

// GET /api/habits — fetch all habits for the authenticated user
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const habits = await Habit.find({ userId: session.user.id })
      .sort({ createdAt: 1 })
      .lean()

    const serialized = habits.map((h) => {
      // Convert Mongoose Map or plain object to Record
      const history: Record<string, boolean> = {}
      if (h.completionHistory) {
        if (h.completionHistory instanceof Map) {
          h.completionHistory.forEach((val: boolean, key: string) => {
            history[key] = val
          })
        } else {
          Object.assign(history, h.completionHistory)
        }
      }

      return {
        id: h._id.toString(),
        name: h.name,
        description: h.description ?? undefined,
        frequency: h.frequency,
        targetDays: h.targetDays,
        currentStreak: h.currentStreak,
        longestStreak: h.longestStreak,
        completionHistory: history,
        createdAt: h.createdAt,
      }
    })

    return NextResponse.json(serialized)
  } catch (error) {
    console.error("GET /api/habits error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// POST /api/habits — create a new habit
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { name, description, frequency, targetDays } = body

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    const habit = await Habit.create({
      name,
      description: description || null,
      frequency: frequency || "daily",
      targetDays: targetDays || [0, 1, 2, 3, 4, 5, 6],
      completionHistory: {},
      userId: session.user.id,
    })

    return NextResponse.json(
      {
        id: habit._id.toString(),
        name: habit.name,
        description: habit.description ?? undefined,
        frequency: habit.frequency,
        targetDays: habit.targetDays,
        currentStreak: habit.currentStreak,
        longestStreak: habit.longestStreak,
        completionHistory: {},
        createdAt: habit.createdAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/habits error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

