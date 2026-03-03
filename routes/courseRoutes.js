const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];

router.get("/managed-courses", adminOnly, courseController.getManagedCourses);

router.get("/", courseController.getAllCourses);

router.get("/:courseId/chapters", chapterController.getCourseChapters);

router.get("/:id", courseController.getCourse);

router.post("/", adminOnly, courseController.createCourse);

router.put("/:id", adminOnly, courseController.updateCourse);

router.delete("/:id", adminOnly, courseController.deleteCourse);

module.exports = router;

