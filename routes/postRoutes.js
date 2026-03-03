const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", postController.getPosts);

router.get("/count", postController.getPostsCount);

router.get("/search", postController.searchPosts);

router.get("/author/:authorId", postController.getPostsByAuthor);

router.get("/:id", postController.getPost);

router.post("/", protect, authorize("admin"), postController.createPost);

router.put("/:id", protect, authorize("admin"), postController.updatePost);

router.delete("/:id", protect, authorize("admin"), postController.deletePost);

router.post("/:id/like", protect, postController.toggleLike);

router.post("/:id/comment", protect, postController.addComment);

router.delete("/:id/comment/:commentId", protect, postController.deleteComment);

module.exports = router;

