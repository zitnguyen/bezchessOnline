const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null, //chưa xếp lớp
    },
    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    email: {
      type: String,
      trim: true,
    },
    phone: String,
    avatar: {
      type: String,
      default: "/images/avatars/default.jpg",
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
