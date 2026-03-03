const express = require("express");
const router = express.Router();

const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];

router.use(adminOnly);

router.put("/reorder", chapterController.reorderChapters);

router.post("/:courseId", chapterController.createChapter);

router.put("/:id", chapterController.updateChapter);

router.delete("/:id", chapterController.deleteChapter);

module.exports = router;

