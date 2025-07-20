import mongoose from "mongoose";

const trainingPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  drills: [String],
  duration_minutes: {
    type: Number,
    default: 45,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const TrainingPlan = mongoose.model("TrainingPlan", trainingPlanSchema);
