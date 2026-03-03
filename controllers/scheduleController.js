const scheduleService = require("../services/scheduleService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createSchedule = asyncHandler(async (req, res) => {
  const {
    studentId,
    studentName,
    lessonName,
    time,
    level,
    dayOfWeek,
    startHour,
  } = req.body;

  const schedule = await scheduleService.createSchedule({
    studentId,
    studentName,
    lessonName,
    time,
    level,
    dayOfWeek,
    startHour,
    teacherId: req.user.id,
    ...req.body,
  });

  res.status(201).json({
    success: true,
    message: "Schedule created successfully",
    data: schedule,
  });
});

exports.getSchedules = asyncHandler(async (req, res) => {
  const { status, dayOfWeek, studentId } = req.query;
  const filters = {};

  if (status) filters.status = status;
  if (dayOfWeek) filters.dayOfWeek = dayOfWeek;
  if (studentId) filters.studentId = studentId;

  const schedules = await scheduleService.getSchedules(filters);

  res.status(200).json({
    success: true,
    message: "Schedules retrieved successfully",
    data: schedules,
  });
});

exports.getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.getScheduleById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Schedule retrieved successfully",
    data: schedule,
  });
});

exports.getMySchedules = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getSchedulesByStudent(req.user.id);

  res.status(200).json({
    success: true,
    message: "My schedules retrieved successfully",
    data: schedules,
  });
});

exports.getSchedulesByDay = asyncHandler(async (req, res) => {
  const { dayOfWeek } = req.params;

  const schedules = await scheduleService.getSchedulesByDay(
    parseInt(dayOfWeek),
  );

  res.status(200).json({
    success: true,
    message: "Schedules for the day retrieved successfully",
    data: schedules,
  });
});

exports.updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.updateSchedule(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Schedule updated successfully",
    data: schedule,
  });
});

exports.updateScheduleStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const schedule = await scheduleService.updateScheduleStatus(
    req.params.id,
    status,
  );

  res.status(200).json({
    success: true,
    message: "Schedule status updated successfully",
    data: schedule,
  });
});

exports.deleteSchedule = asyncHandler(async (req, res) => {
  await scheduleService.deleteSchedule(req.params.id);

  res.status(200).json({
    success: true,
    message: "Schedule deleted successfully",
  });
});
