const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String, // "Khóa học", "Vận hành", "Hoàn tiền", etc.
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    month: String, // "T1", "T2", etc for monthly reports
  },
  { timestamps: true },
);

module.exports = mongoose.model("Finance", FinanceSchema);
