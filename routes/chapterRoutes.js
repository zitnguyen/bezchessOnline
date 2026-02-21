const express = require("express");
const router = express.Router();

const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];

router.use(adminOnly);

// Reorder chapters trong 1 course
router.put("/reorder", chapterController.reorderChapters);

// Tạo chapter thuộc course
router.post("/:courseId", chapterController.createChapter);

// Cập nhật chapter
router.put("/:id", chapterController.updateChapter);

// Xóa chapter
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;
