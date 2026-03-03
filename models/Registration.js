const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseNote: String,
    studentName: {
      type: String,
      required: true,
    },
    studentBirthYear: String,
    parentName: String,
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    preferredTimes: [String], // ["Monday", "Wednesday", "Friday"]
    notes: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rejectedReason: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Registration", RegistrationSchema);
