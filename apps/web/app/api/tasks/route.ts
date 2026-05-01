import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Task from "@/models/Task"
import { auth } from "@/auth";
import { headers } from "next/headers";
import type { TaskStatus, TaskPriority } from "@workspace/ui/types/task"

// GET /api/tasks — fetch all tasks for the authenticated user
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const tasks = await Task.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean()

    const serialized = tasks.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      description: t.description ?? undefined,
      status: t.status as TaskStatus,
      priority: t.priority as TaskPriority,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      dueDate: t.dueDate ?? undefined,
      labels: t.labels ?? [],
      assigneeId: t.assigneeId ?? undefined,
    }))

    return NextResponse.json(serialized)
  } catch (error) {
    console.error("GET /api/tasks error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// POST /api/tasks — create a new task
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { title, description, status, priority, dueDate, labels } = body

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const task = await Task.create({
      title,
      description: description || undefined,
      status: (status || "todo") as TaskStatus,
      priority: (priority || "medium") as TaskPriority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      labels: labels || [],
      userId: session.user.id,
    })

    return NextResponse.json(
      {
        id: task._id.toString(),
        title: task.title,
        description: task.description ?? undefined,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        dueDate: task.dueDate ?? undefined,
        labels: task.labels,
        assigneeId: task.assigneeId ?? undefined,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/tasks error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

