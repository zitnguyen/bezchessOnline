const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true }, //seo url
  description: { type: String, required: true },
  thumbnail: { type: String }, //đường dẫn ảnh bìa
  price: { type: Number, required: true, default: 0 },
  salePrice: { type: Number, default: 0 },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
    default: "All Levels",
  },
  category: [
    {
      type: String,
      enum: [
        "opening",
        "strategy",
        "tactics",
        "endgame",
        "general",
        "repertoire",
        "exercises",
      ],
    },
  ],
  tags: [{ type: String }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //người tạo khóa học
  isPublished: { type: Boolean, default: false }, //xuất bản: true, nháp: false
  isDeleted: { type: Boolean, default: false }, //xóa mềm
  totalLessons: { type: Number, default: 0 }, //tổng số bài học
  totalDuration: { type: Number, default: 0 }, //tổng thời lương(phút)
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalStudents: {
    type: Number,
    default: 0,
  },
  hasCertificate: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      id: String,
      userId: String,
      userName: String,
      rating: Number,
      comment: String,
      date: String,
    },
  ],
  whatYouWillLearn: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//tính % giảm giá
courseSchema.virtual("discountPercentage").get(function () {
  if (this.price > 0 && this.salePrice > 0 && this.salePrice < this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Virtual: populate curriculum với chapters và lessons
courseSchema.virtual("curriculum", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "courseId",
  match: { isDeleted: false },
  options: { sort: { order: 1 } },
});

// cập nhật updatedAt trước khi lưu
courseSchema.pre("save", function () {
  this.updatedAt = new Date();
});

// Enable virtuals khi convert to JSON
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
