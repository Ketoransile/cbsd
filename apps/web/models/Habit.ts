import mongoose, { Schema, Document, Model } from "mongoose"

export interface IHabit extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  description?: string
  frequency: "daily" | "weekly" | "monthly"
  targetDays: number[]
  currentStreak: number
  longestStreak: number
  completionHistory: Map<string, boolean>
  userId: string
  createdAt: Date
  updatedAt: Date
}

const HabitSchema = new Schema<IHabit>(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },
    targetDays: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    completionHistory: { type: Map, of: Boolean, default: {} },
    userId: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
)

const Habit: Model<IHabit> =
  mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema)

export default Habit
