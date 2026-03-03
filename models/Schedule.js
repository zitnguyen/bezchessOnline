const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    lessonName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    time: {
      type: String, // "06:00 - 07:00"
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
    dayOfWeek: {
      type: Number, // 0=Sunday, 1=Monday, etc.
      required: true,
    },
    startHour: {
      type: Number, // 24-hour format
      required: true,
    },
    endHour: {
      type: Number,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: String,
    notes: String,
    recordingUrl: String, // for recorded lessons
  },
  { timestamps: true },
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
