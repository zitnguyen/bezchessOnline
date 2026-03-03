const attendanceService = require("../services/attendanceService");
const asyncHandler = require("../middleware/asyncHandler");

exports.recordAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.recordAttendance(req.body);

  res.status(201).json({
    success: true,
    message: "Attendance recorded successfully",
    data: attendance,
  });
});

exports.getAttendanceByClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { date } = req.query;

  const attendance = await attendanceService.getAttendanceByClass(
    classId,
    date,
  );

  res.status(200).json({
    success: true,
    message: "Class attendance retrieved successfully",
    data: attendance,
  });
});

exports.getMyAttendance = asyncHandler(async (req, res) => {
  const { fromDate } = req.query;

  const attendance = await attendanceService.getAttendanceByStudent(
    req.user.id,
    fromDate,
  );

  res.status(200).json({
    success: true,
    message: "My attendance records retrieved successfully",
    data: attendance,
  });
});

exports.getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getAttendanceById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Attendance record retrieved successfully",
    data: attendance,
  });
});

exports.updateAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.updateAttendance(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Attendance updated successfully",
    data: attendance,
  });
});

exports.deleteAttendance = asyncHandler(async (req, res) => {
  await attendanceService.deleteAttendance(req.params.id);

  res.status(200).json({
    success: true,
    message: "Attendance deleted successfully",
  });
});

exports.getAttendanceStats = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const stats = await attendanceService.getAttendanceStats(classId);

  res.status(200).json({
    success: true,
    message: "Attendance statistics retrieved successfully",
    data: stats,
  });
});
