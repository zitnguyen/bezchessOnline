const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a post title"],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    content: {
      type: String,
      required: [true, "Please provide post content"],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must have an author"],
    },
    category: {
      type: String,
      enum: ["General", "Tutorial", "News", "Tips", "Guide", "Other"],
      default: "General",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Index for better query performance
postSchema.index({ category: 1 });
postSchema.index({ isPublished: 1 });
postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
