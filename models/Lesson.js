const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["video", "text", "quiz"],
      default: "video",
    },

    // Nội dung linh hoạt
    videoUrl: {
      type: String,
    },

    textContent: {
      type: String,
    },

    quizData: {
      type: mongoose.Schema.Types.Mixed,
    },

    duration: {
      type: Number,
      default: 0, // seconds
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
    shortDescription: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lesson", lessonSchema);
