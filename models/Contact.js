const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ageGroup: {
      type: String,
      enum: ["6-8", "9-12", "13-18", "adults"],
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    needs: {
      type: String, // "tư vấn", "hỗ trợ kỹ thuật", etc.
    },
    preferredTime: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
    },
    note: String,
    status: {
      type: String,
      enum: ["new", "reviewed", "responded"],
      default: "new",
    },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    response: String,
    respondedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", ContactSchema);
