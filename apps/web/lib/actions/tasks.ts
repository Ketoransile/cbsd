"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb"
import Task from "@/models/Task"
import { revalidatePath } from "next/cache"
import type { TaskStatus, TaskPriority } from "@workspace/ui/types/task"

export async function getTasks() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return []

  await connectDB()

  const tasks = await Task.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()

  return tasks.map((t) => ({
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
}

export async function createTask(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  const title = formData.get("title") as string
  if (!title) return { error: "Title is required" }

  await connectDB()

  const description = (formData.get("description") as string) || undefined
  const status = ((formData.get("status") as string) || "todo") as TaskStatus
  const priority = ((formData.get("priority") as string) || "medium") as TaskPriority

  await Task.create({
    title,
    description,
    status,
    priority,
    labels: [],
    userId: session.user.id,
  })

  revalidatePath("/tasks")
}

export async function updateTaskStatus(taskId: string, status: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  await connectDB()

  await Task.findOneAndUpdate(
    { _id: taskId, userId: session.user.id },
    { status },
    { new: true }
  )

  revalidatePath("/tasks")
}

export async function deleteTask(taskId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  await connectDB()

  await Task.findOneAndDelete({ _id: taskId, userId: session.user.id })
  revalidatePath("/tasks")
}

