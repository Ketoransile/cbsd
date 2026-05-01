import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Task from "@/models/Task"
import { auth } from "@/auth";
import { headers } from "next/headers";

interface RouteContext {
  params: Promise<{ id: string }>
}

// PATCH /api/tasks/:id — update a task
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { id } = await context.params
    const body = await request.json()
    const { title, description, status, priority, dueDate, labels } = body

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
        ...(labels !== undefined && { labels }),
      },
      { new: true, runValidators: true }
    ).lean()

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: task._id.toString(),
      title: task.title,
      description: task.description ?? undefined,
      status: task.status,
      priority: task.priority,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueDate: task.dueDate ?? undefined,
      labels: task.labels ?? [],
      assigneeId: task.assigneeId ?? undefined,
    })
  } catch (error) {
    console.error("PATCH /api/tasks/:id error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/:id — delete a task
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { id } = await context.params
    const task = await Task.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/tasks/:id error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
