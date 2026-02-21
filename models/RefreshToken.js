const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userAgent: String, //store thiết bị người dùng
    ipAddress: String, //store địa chỉ IP người dùng
    expiresAt: {
      type: Date,
      required: true,
    }, //ngày hết hạn token
  },
  { timestamps: true },
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
