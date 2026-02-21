const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    source: {
      type: String,
      enum: ["purchase", "admin_grant"],
      default: "purchase",
    },

    status: {
      type: String,
      enum: ["active", "expired", "revoked", "refunded"],
      default: "active",
      index: true,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: Date,

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    lastAccessedAt: Date,
  },
  { timestamps: true },
);

// indexes
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
enrollmentSchema.index({ userId: 1, status: 1 });

// methods
enrollmentSchema.methods.markLessonCompleted = async function (lessonId) {
  const Lesson = require("./Lesson");
  const Chapter = require("./Chapter");

  const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

  const alreadyCompleted = this.completedLessons.some(
    (id) => id.toString() === lessonObjectId.toString(),
  );

  if (!alreadyCompleted) {
    this.completedLessons.push(lessonObjectId);
  }

  const chapters = await Chapter.find({ courseId: this.courseId }).select(
    "_id",
  );
  const chapterIds = chapters.map((c) => c._id);

  const totalLessons = await Lesson.countDocuments({
    chapterId: { $in: chapterIds },
    isPublished: true,
    isDeleted: false,
  });

  this.progress =
    totalLessons === 0
      ? 0
      : Math.round((this.completedLessons.length / totalLessons) * 100);

  this.isCompleted = this.progress >= 100;
  this.lastAccessedAt = new Date();

  await this.save();

  return this;
};

module.exports = mongoose.model("Enrollment", enrollmentSchema);
