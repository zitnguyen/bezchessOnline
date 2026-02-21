const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled", "refunded"],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "momo", "cash", "other"],
      default: "bank_transfer",
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paidAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
