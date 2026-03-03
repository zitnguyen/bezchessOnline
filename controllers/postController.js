const postService = require("../services/postService");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPosts = asyncHandler(async (req, res) => {
  const { category, tag, page = 1, limit = 10 } = req.query;

  const result = await postService.getPosts(category, tag, page, limit);

  res.status(200).json({
    success: true,
    message: "Posts retrieved successfully",
    data: result,
  });
});

exports.getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);

  res.status(200).json({
    success: true,
    message: "Post retrieved successfully",
    data: post,
  });
});

exports.getPostsByAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const result = await postService.getPostsByAuthor(authorId, page, limit);

  res.status(200).json({
    success: true,
    message: "Author posts retrieved successfully",
    data: result,
  });
});

exports.createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await postService.updatePost(id, req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await postService.deletePost(id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

exports.toggleLike = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await postService.toggleLike(id, req.user._id);

  res.status(200).json({
    success: true,
    message: result.liked ? "Post liked" : "Post unliked",
    data: result,
  });
});

exports.addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comments = await postService.addComment(id, req.user._id, content);

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: comments,
  });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const { id, commentId } = req.params;

  await postService.deleteComment(id, commentId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

exports.getPostsCount = asyncHandler(async (req, res) => {
  const count = await postService.getPostsCount();

  res.status(200).json({
    success: true,
    message: "Posts count retrieved successfully",
    data: { totalPosts: count },
  });
});

exports.searchPosts = asyncHandler(async (req, res) => {
  const { q: searchQuery, page = 1, limit = 10 } = req.query;

  if (!searchQuery || searchQuery.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const result = await postService.searchPosts(searchQuery, page, limit);

  res.status(200).json({
    success: true,
    message: "Posts search completed successfully",
    data: result,
  });
});
