const Attendance = require("../models/Attendance");
const AppError = require("../utils/AppError");
exports.recordAttendance = async (data) => {
  return await Attendance.create(data);
};

exports.getAttendanceByClass = async (classId, date = null) => {
  const query = { classId };
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query.date = { $gte: startOfDay, $lte: endOfDay };
  }

  return await Attendance.find(query)
    .populate("studentId", "name email")
    .populate("classId", "lessonName time");
};

exports.getAttendanceByStudent = async (studentId, fromDate = null) => {
  const query = { studentId };
  if (fromDate) {
    query.date = { $gte: new Date(fromDate) };
  }

  return await Attendance.find(query)
    .populate("classId", "lessonName time")
    .sort({ date: -1 });
};

exports.getAttendanceById = async (id) => {
  const attendance = await Attendance.findById(id)
    .populate("studentId", "name email")
    .populate("classId", "lessonName time");
  if (!attendance) {
    throw new AppError("Attendance record not found", 404);
  }
  return attendance;
};

exports.updateAttendance = async (id, data) => {
  const attendance = await Attendance.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!attendance) {
    throw new AppError("Attendance record not found", 404);
  }
  return attendance;
};

exports.deleteAttendance = async (id) => {
  const attendance = await Attendance.findByIdAndDelete(id);
  if (!attendance) {
    throw new AppError("Attendance record not found", 404);
  }
  return attendance;
};

exports.getAttendanceStats = async (classId) => {
  const records = await Attendance.find({ classId });

  const stats = {
    total: records.length,
    present: records.filter((r) => r.status === "present").length,
    absent: records.filter((r) => r.status === "absent").length,
    late: records.filter((r) => r.status === "late").length,
    excused: records.filter((r) => r.status === "excused").length,
  };

  stats.attendanceRate =
    stats.total > 0
      ? Math.round(((stats.present + stats.late) / stats.total) * 100)
      : 0;

  return stats;
};
