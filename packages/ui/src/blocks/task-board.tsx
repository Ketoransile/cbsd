"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { MoreHorizontal, Calendar, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import type { Task, TaskStatus } from "@workspace/ui/types/task"

interface TaskBoardProps {
  tasks?: Task[]
  onTaskMove?: (taskId: string, newStatus: TaskStatus, newIndex: number) => void
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
]

export function TaskBoard({ tasks = [], onTaskMove }: TaskBoardProps) {
  const [boardData, setBoardData] = React.useState<Record<TaskStatus, Task[]>>({
    todo: [],
    "in-progress": [],
    done: [],
    archived: []
  })

  // Group tasks by status
  React.useEffect(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      "in-progress": [],
      done: [],
      archived: []
    }
    
    tasks.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status].push(task)
      }
    })
    
    setBoardData(grouped)
  }, [tasks])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceStatus = source.droppableId as TaskStatus
    const destStatus = destination.droppableId as TaskStatus

    // Optimistic UI update
    const sourceCol = [...boardData[sourceStatus]]
    const destCol = sourceStatus === destStatus ? sourceCol : [...boardData[destStatus]]
    
    const [movedTask] = sourceCol.splice(source.index, 1)
    
    // Update task status if moved to new column
    const updatedTask = { 
      ...movedTask, 
      status: destStatus,
      updatedAt: new Date()
    }
    
    destCol.splice(destination.index, 0, updatedTask)

    setBoardData(prev => ({
      ...prev,
      [sourceStatus]: sourceCol,
      [destStatus]: destCol
    }))

    // Call prop handler
    if (onTaskMove) {
      onTaskMove(draggableId, destStatus, destination.index)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "low": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "medium": return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      case "high": return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "urgent": return "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "todo": return <AlertCircle className="h-4 w-4 text-muted-foreground" />
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />
      case "done": return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  return (
    <div className="h-full w-full flex flex-col">
      <DragDropContext onDragEnd={onDragEnd}>
        <ScrollArea className="flex-1 w-full whitespace-nowrap pb-4">
          <div className="flex gap-6 h-full p-1 min-h-[500px]">
            {COLUMNS.map((column) => {
              const columnTasks = boardData[column.id] || []
              
              return (
                <div key={column.id} className="flex flex-col w-[350px] shrink-0 h-full max-h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(column.id)}
                      <h3 className="font-semibold">{column.title}</h3>
                      <Badge variant="secondary" className="rounded-full px-2">
                        {columnTasks.length}
                      </Badge>
                    </div>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto overflow-x-hidden min-h-[150px] rounded-xl p-2 transition-colors ${
                          snapshot.isDraggingOver ? "bg-muted/50 border border-dashed" : "bg-muted/30 border border-transparent"
                        }`}
                      >
                        <div className="flex flex-col gap-3">
                          {columnTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`shadow-sm border-border/50 hover:border-primary/30 transition-all ${
                                    snapshot.isDragging ? "shadow-md ring-1 ring-primary/20 rotate-1 scale-[1.02]" : ""
                                  }`}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                                    <div className="flex flex-wrap gap-1.5">
                                      <Badge variant="secondary" className={`text-[10px] uppercase border-0 font-semibold px-1.5 py-0 ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </Badge>
                                      {task.labels.slice(0, 2).map(label => (
                                        <Badge key={label} variant="outline" className="text-[10px] px-1.5 py-0">
                                          {label}
                                        </Badge>
                                      ))}
                                    </div>
                                    <button className="text-muted-foreground hover:text-foreground mt-[-4px] mr-[-4px] p-1">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                  </CardHeader>
                                  <CardContent className="p-4 pt-2">
                                    <h4 className="font-medium text-sm leading-tight mb-2 whitespace-normal break-words">
                                      {task.title}
                                    </h4>
                                    {task.description && (
                                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 whitespace-normal">
                                        {task.description}
                                      </p>
                                    )}
                                    
                                    <div className="flex items-center justify-between mt-auto pt-2">
                                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                        <Calendar className="h-3 w-3" />
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No date'}
                                      </div>
                                      
                                      {task.assigneeId && (
                                        <Avatar className="h-6 w-6 border-2 border-background">
                                          <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                                            {task.assigneeId.substring(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DragDropContext>
    </div>
  )
}
