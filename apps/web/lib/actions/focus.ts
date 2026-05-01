"use server"

import { auth } from "@/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodb"
import FocusSession from "@/models/FocusSession"
import { revalidatePath } from "next/cache"

export async function getFocusSessions() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return []

  await connectDB()

  const sessions = await FocusSession.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean()

  return sessions.map((fs) => ({
    id: fs._id.toString(),
    duration: fs.duration,
    type: fs.type,
    completed: fs.completed,
    startTime: fs.startTime,
    endTime: fs.endTime ?? undefined,
    createdAt: fs.createdAt,
  }))
}

export async function createFocusSession(data: {
  duration: number
  type: "work" | "break"
  completed: boolean
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { error: "Unauthorized" }

  await connectDB()

  const focusSession = await FocusSession.create({
    duration: data.duration,
    type: data.type,
    completed: data.completed,
    startTime: new Date(),
    endTime: new Date(),
    userId: session.user.id,
  })

  revalidatePath("/focus")

  return {
    id: focusSession._id.toString(),
    duration: focusSession.duration,
    type: focusSession.type,
    completed: focusSession.completed,
  }
}

export async function getTodayFocusStats() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) return { totalMinutes: 0, sessionsCount: 0 }

  await connectDB()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sessions = await FocusSession.find({
    userId: session.user.id,
    createdAt: { $gte: today },
    completed: true,
    type: "work",
  }).lean()

  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0)

  return {
    totalMinutes,
    sessionsCount: sessions.length,
  }
}

