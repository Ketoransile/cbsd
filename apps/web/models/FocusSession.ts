import mongoose, { Schema, Document, Model } from "mongoose"

export interface IFocusSession extends Document {
  _id: mongoose.Types.ObjectId
  duration: number // in minutes
  type: "work" | "break"
  completed: boolean
  startTime: Date
  endTime?: Date
  userId: string
  createdAt: Date
}

const FocusSessionSchema = new Schema<IFocusSession>(
  {
    duration: { type: Number, required: true, default: 25 },
    type: {
      type: String,
      enum: ["work", "break"],
      default: "work",
    },
    completed: { type: Boolean, default: false },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, default: null },
    userId: { type: String, required: true, index: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

const FocusSession: Model<IFocusSession> =
  mongoose.models.FocusSession ||
  mongoose.model<IFocusSession>("FocusSession", FocusSessionSchema)

export default FocusSession
