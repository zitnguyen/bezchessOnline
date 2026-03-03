const mongoose = require("mongoose");
const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Virtual: populate lessons của chapter
chapterSchema.virtual("lessons", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "chapterId",
  match: { isDeleted: false },
  options: { sort: { order: 1 } },
});

// Enable virtuals khi convert to JSON
chapterSchema.set("toJSON", { virtuals: true });
chapterSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Chapter", chapterSchema);
