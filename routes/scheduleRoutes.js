const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, scheduleController.createSchedule);
router.get("/", scheduleController.getSchedules);

router.get("/day/:dayOfWeek", scheduleController.getSchedulesByDay);

router.get("/my-schedules", protect, scheduleController.getMySchedules);

router.get("/:id", scheduleController.getScheduleById);
router.put("/:id", protect, scheduleController.updateSchedule);
router.delete("/:id", protect, scheduleController.deleteSchedule);

router.patch("/:id/status", protect, scheduleController.updateScheduleStatus);

module.exports = router;
