const express = require("express");
const router = express.Router();

const enrollmentController = require("../controllers/enrollmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/:courseId", protect, enrollmentController.createEnrollment);

router.get("/my-courses", protect, enrollmentController.getMyCourses);

router.get(
  "/:courseId/progress",
  protect,
  enrollmentController.getCourseProgress,
);

router.patch(
  "/:id/revoke",
  protect,
  authorize("admin"),
  enrollmentController.revokeEnrollment,
);

router.get(
  "/course/:courseId/students",
  protect,
  authorize("admin"),
  enrollmentController.getCourseStudents,
);

module.exports = router;

