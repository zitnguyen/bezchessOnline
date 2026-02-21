const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

const adminOnly = [protect, authorize("admin")];
// Lấy tất cả courses
router.get("/", courseController.getAllCourses);
// Lấy tất cả chapters của 1 course
router.get("/:courseId/chapters", chapterController.getCourseChapters);
// Lấy chi tiết course
router.get("/:id", courseController.getCourse);
// Lấy courses do admin quản lý
router.get("/managed-courses", adminOnly, courseController.getManagedCourses);
// Tạo course mới
router.post("/", adminOnly, courseController.createCourse);
// Cập nhật course
router.put("/:id", adminOnly, courseController.updateCourse);
// Xóa course
router.delete("/:id", adminOnly, courseController.deleteCourse);

module.exports = router;
