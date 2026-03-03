const Post = require("../models/Post");
const AppError = require("../utils/AppError");

exports.getPosts = async (category, tag, page = 1, limit = 10) => {
  const query = { isPublished: true };

  if (category && category !== "All") {
    query.category = category;
  }
  if (tag) {
    query.tags = tag;
  }

  const skip = (page - 1) * limit;

  const posts = await Post.find(query)
    .populate("author", "fullName username")
    .populate("likedBy", "fullName username")
    .populate("comments.author", "fullName username")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip)
    .lean();

  const count = await Post.countDocuments(query);

  return {
    posts,
    totalPosts: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

exports.getPostById = async (id) => {
  let post;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    post = await Post.findById(id)
      .populate("author", "fullName username")
      .populate("likedBy", "fullName username")
      .populate("comments.author", "fullName username");
  } else {
    post = await Post.findOne({ slug: id })
      .populate("author", "fullName username")
      .populate("likedBy", "fullName username")
      .populate("comments.author", "fullName username");
  }

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  post.views += 1;
  await post.save();

  return post;
};

exports.getPostsByAuthor = async (authorId, page = 1, limit = 10) => {
  const query = { author: authorId };
  const skip = (page - 1) * limit;

  const posts = await Post.find(query)
    .populate("author", "fullName username")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip)
    .lean();

  const count = await Post.countDocuments(query);

  return {
    posts,
    totalPosts: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

exports.createPost = async (postData, authorId) => {
  const {
    title,
    slug,
    content,
    summary,
    thumbnail,
    category,
    tags,
    isPublished,
  } = postData;

  if (!title || !slug || !content) {
    throw new AppError("Title, slug, and content are required", 400);
  }

  const existingPost = await Post.findOne({ slug });
  if (existingPost) {
    throw new AppError("Slug already exists", 400);
  }

  const post = new Post({
    title,
    slug,
    content,
    summary,
    thumbnail,
    author: authorId,
    category: category || "General",
    tags: tags || [],
    isPublished: isPublished || false,
  });

  await post.save();
  await post.populate("author", "fullName username");

  return post;
};

exports.updatePost = async (postId, updateData, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (post.author.toString() !== userId.toString()) {
    throw new AppError("You are not authorized to update this post", 403);
  }

  // Update allowed fields
  const allowedFields = [
    "title",
    "content",
    "summary",
    "thumbnail",
    "category",
    "tags",
    "isPublished",
  ];

  if (updateData.slug && updateData.slug !== post.slug) {
    const existingSlug = await Post.findOne({ slug: updateData.slug });
    if (existingSlug) {
      throw new AppError("Slug already exists", 400);
    }
    post.slug = updateData.slug;
  }

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      post[key] = updateData[key];
    }
  });

  post.updatedAt = Date.now();
  await post.save();
  await post.populate("author", "fullName username");

  return post;
};

exports.deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (post.author.toString() !== userId.toString()) {
    throw new AppError("You are not authorized to delete this post", 403);
  }

  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
};

exports.toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const userIdStr = userId.toString();
  const isLiked = post.likedBy.some((id) => id.toString() === userIdStr);

  if (isLiked) {
    post.likedBy = post.likedBy.filter((id) => id.toString() !== userIdStr);
    post.likes = Math.max(0, post.likes - 1);
  } else {
    post.likedBy.push(userId);
    post.likes += 1;
  }

  await post.save();
  return {
    liked: !isLiked,
    likes: post.likes,
  };
};

exports.addComment = async (postId, userId, commentContent) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (!commentContent || commentContent.trim().length === 0) {
    throw new AppError("Comment content is required", 400);
  }

  post.comments.push({
    author: userId,
    content: commentContent,
  });

  await post.save();
  await post.populate("comments.author", "fullName username");

  return post.comments;
};

exports.deleteComment = async (postId, commentId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new AppError("You are not authorized to delete this comment", 403);
  }

  post.comments.id(commentId).deleteOne();
  await post.save();

  return { message: "Comment deleted successfully" };
};

exports.getPostsCount = async () => {
  return await Post.countDocuments({ isPublished: true });
};

exports.searchPosts = async (searchQuery, page = 1, limit = 10) => {
  const query = {
    isPublished: true,
    $or: [
      { title: { $regex: searchQuery, $options: "i" } },
      { content: { $regex: searchQuery, $options: "i" } },
      { tags: { $regex: searchQuery, $options: "i" } },
    ],
  };

  const skip = (page - 1) * limit;

  const posts = await Post.find(query)
    .populate("author", "fullName username")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip)
    .lean();

  const count = await Post.countDocuments(query);

  return {
    posts,
    totalPosts: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};
