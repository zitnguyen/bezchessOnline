const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

//lấy danh sách khóa học đã đăng ký
router.get("/my-courses", protect, enrollmentController.getMyCourses);

//lấy tiến độ khóa học
router.get(
  "/:courseId/progress",
  protect,
  enrollmentController.getCourseProgress,
);

//đăng ký khóa học
router.patch(
  "/:id/revoke",
  protect,
  authorize("admin"),
  enrollmentController.revokeEnrollment,
);

//lấy danh sách học viên đã đăng ký khóa học
router.get(
  "/course/:courseId/students",
  protect,
  authorize("admin"),
  enrollmentController.getCourseStudents,
);

module.exports = router;
