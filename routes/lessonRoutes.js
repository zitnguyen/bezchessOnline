const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];

router.get("/chapter/:chapterId", lessonController.getChapterLessons);

router.get("/:lessonId", protect, lessonController.getLessonForUser);

router.put("/reorder", adminOnly, lessonController.reorderLessons);

router.post("/chapter/:chapterId", adminOnly, lessonController.createLesson);

router.put("/:id", adminOnly, lessonController.updateLesson);

router.delete("/:id", adminOnly, lessonController.deleteLesson);

module.exports = router;

