"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { TaskBoard } from "@workspace/ui/blocks/task-board"
import { Button } from "@workspace/ui/components/button"
import type { Task, TaskStatus } from "@workspace/ui/types/task"
import { updateTaskStatus } from "@/lib/actions/tasks"

interface TasksPageProps {
  initialTasks: Task[]
}

export default function TasksPageClient({ initialTasks }: TasksPageProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks)

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus, newIndex: number) => {
    // Optimistic update
    setTasks(current => 
      current.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, updatedAt: new Date() } 
          : task
      )
    )
    
    // Server update
    await updateTaskStatus(taskId, newStatus)
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 h-[calc(100vh-4rem)] md:h-screen flex flex-col">
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
