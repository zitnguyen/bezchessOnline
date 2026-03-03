const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "parent"],
      default: "parent",
    },

    //Teacher
    specialization: {
      type: String,
      required: function () {
        return this.role === "teacher";
      },
    },

    experienceYears: {
      type: Number,
      min: 0,
      required: function () {
        return this.role === "teacher";
      },
    },
    certification: {
      type: String,
      required: function () {
        return this.role === "teacher";
      },
    },

    //Parent
    address: {
      type: String,
      trim: true,
    },

    // Common fields
    name: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "/images/avatars/default.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    birthDate: Date,
    bio: String,
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: "vi",
      },
    },
  },
  { timestamps: true },
);

//hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//ss password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
