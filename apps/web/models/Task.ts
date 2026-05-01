import mongoose, { Schema, Document, Model } from "mongoose"

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId
  title: string
  description?: string
  status: "todo" | "in-progress" | "done" | "archived"
  priority: "low" | "medium" | "high" | "urgent"
  dueDate?: Date
  labels: string[]
  assigneeId?: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done", "archived"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: { type: Date, default: null },
    labels: { type: [String], default: [] },
    assigneeId: { type: String, default: null },
    userId: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
)

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema)

export default Task
