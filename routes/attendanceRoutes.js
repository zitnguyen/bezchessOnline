const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, attendanceController.recordAttendance);

router.get(
  "/class/:classId",
  protect,
  attendanceController.getAttendanceByClass,
);

router.get(
  "/class/:classId/stats",
  protect,
  attendanceController.getAttendanceStats,
);

router.get("/my-attendance", protect, attendanceController.getMyAttendance);

router.get("/:id", protect, attendanceController.getAttendanceById);
router.put("/:id", protect, attendanceController.updateAttendance);
router.delete("/:id", protect, attendanceController.deleteAttendance);

module.exports = router;

