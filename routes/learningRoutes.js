const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learningController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, learningController.getMyLearning);

router.get("/:id", protect, learningController.getLearningById);
router.delete("/:id", protect, learningController.deleteLearning);

router.get(
  "/course/:courseId/progress",
  protect,
  learningController.getProgress,
);

router.put("/:courseId/progress", protect, learningController.updateProgress);

router.post(
  "/:courseId/lessons/:lessonId/complete",
  protect,
  learningController.markLessonComplete,
);

module.exports = router;

