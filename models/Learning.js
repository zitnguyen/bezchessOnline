const mongoose = require("mongoose");

const LearningSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: String,
    thumbnail: String,
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastLessonId: String,
    lastLessonTitle: String,
    totalLessons: Number,
    completedLessons: {
      type: Number,
      default: 0,
    },
    level: String,
    teacherName: String,
    estimatedTimeRemaining: Number, // in minutes
    completedLessonIds: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Learning", LearningSchema);
