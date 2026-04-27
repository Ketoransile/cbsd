"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { TaskBoard } from "@workspace/ui/blocks/task-board"
import { Button } from "@workspace/ui/components/button"
import type { Task, TaskStatus } from "@workspace/ui/types/task"

const INITIAL_TASKS: Task[] = [
  {
    id: "t1",
    title: "Implement authentication flow",
    description: "Set up NextAuth with GitHub provider and create login page.",
    status: "todo",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 86400000 * 2), // in 2 days
    labels: ["auth", "frontend", "backend"],
    assigneeId: "user1"
  },
  {
    id: "t2",
    title: "Design system audit",
    description: "Review all primitive components for WCAG AA compliance.",
    status: "todo",
    priority: "medium",
    createdAt: new Date(),
    updatedAt: new Date(),
    labels: ["design", "accessibility"],
  },
  {
    id: "t3",
    title: "Database schema optimization",
    description: "Add necessary indexes to the activities table to speed up analytics queries.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 86400000), // tomorrow
    labels: ["database", "performance"],
    assigneeId: "user2"
  },
  {
    id: "t4",
    title: "Update documentation",
    description: "Write architectural overview for the new monorepo setup.",
    status: "in-progress",
    priority: "low",
    createdAt: new Date(),
    updatedAt: new Date(),
    labels: ["docs"],
  },
  {
    id: "t5",
    title: "Fix navigation bug",
    description: "Mobile sidebar doesn't close on route change.",
    status: "done",
    priority: "urgent",
    createdAt: new Date(),
    updatedAt: new Date(),
    labels: ["bug", "frontend"],
    assigneeId: "user1"
  }
]

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS)

  const handleTaskMove = (taskId: string, newStatus: TaskStatus, newIndex: number) => {
    // In a real app, this would make an API call
    setTasks(current => 
      current.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updatedAt: new Date() } 
          : task
      )
    )
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage your project tasks using the Kanban board.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 bg-background/50 rounded-xl border p-4">
        <TaskBoard 
          tasks={tasks} 
          onTaskMove={handleTaskMove} 
        />
      </div>
    </div>
  )
}
