import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import FocusSession from "@/models/FocusSession"
import { auth } from "@/auth";
import { headers } from "next/headers";

// GET /api/focus-sessions — fetch all focus sessions for the authenticated user
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const focusSessions = await FocusSession.find({
      userId: session.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    const serialized = focusSessions.map((fs) => ({
      id: fs._id.toString(),
      duration: fs.duration,
      type: fs.type,
      completed: fs.completed,
      startTime: fs.startTime,
      endTime: fs.endTime ?? undefined,
      createdAt: fs.createdAt,
    }))

    return NextResponse.json(serialized)
  } catch (error) {
    console.error("GET /api/focus-sessions error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// POST /api/focus-sessions — create a new focus session record
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { duration, type, completed, startTime, endTime } = body

    const focusSession = await FocusSession.create({
      duration: duration || 25,
      type: (type || "work") as "work" | "break",
      completed: completed ?? false,
      startTime: startTime ? new Date(startTime) : new Date(),
      endTime: endTime ? new Date(endTime) : undefined,
      userId: session.user.id,
    })

    return NextResponse.json(
      {
        id: focusSession._id.toString(),
        duration: focusSession.duration,
        type: focusSession.type,
        completed: focusSession.completed,
        startTime: focusSession.startTime,
        endTime: focusSession.endTime ?? undefined,
        createdAt: focusSession.createdAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/focus-sessions error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

