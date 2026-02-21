const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];
// Lấy tất cả lesson thuộc 1 chapter
router.get("/chapter/:chapterId", lessonController.getChapterLessons);

// Xem 1 lesson (phải đăng nhập + check enrollment)
router.get("/:lessonId", protect, lessonController.getLessonForUser);

// Reorder lesson trong chapter
router.put("/reorder", adminOnly, lessonController.reorderLessons);

// Tạo lesson cho 1 chapter
router.post("/chapter/:chapterId", adminOnly, lessonController.createLesson);

// Cập nhật lesson
router.put("/:id", adminOnly, lessonController.updateLesson);

// Xóa lesson
router.delete("/:id", adminOnly, lessonController.deleteLesson);

module.exports = router;
