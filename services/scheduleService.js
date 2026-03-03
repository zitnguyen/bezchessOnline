const Schedule = require("../models/Schedule");
const AppError = require("../utils/AppError");

exports.createSchedule = async (data) => {
  return await Schedule.create(data);
};

exports.getSchedules = async (filters = {}) => {
  const query = Schedule.find(filters)
    .populate("studentId", "name email")
    .populate("courseId", "title");
  return await query.exec();
};

exports.getScheduleById = async (id) => {
  const schedule = await Schedule.findById(id)
    .populate("studentId", "name email")
    .populate("courseId", "title")
    .populate("teacherId", "name");
  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }
  return schedule;
};

exports.getSchedulesByStudent = async (studentId) => {
  return await Schedule.find({ studentId })
    .populate("courseId", "title")
    .sort({ dayOfWeek: 1, startHour: 1 });
};

exports.getSchedulesByTeacher = async (teacherId) => {
  return await Schedule.find({ teacherId })
    .populate("studentId", "name email")
    .populate("courseId", "title")
    .sort({ dayOfWeek: 1, startHour: 1 });
};

exports.updateSchedule = async (id, data) => {
  const schedule = await Schedule.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }
  return schedule;
};

exports.deleteSchedule = async (id) => {
  const schedule = await Schedule.findByIdAndDelete(id);
  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }
  return schedule;
};

exports.getSchedulesByDay = async (dayOfWeek) => {
  return await Schedule.find({ dayOfWeek })
    .populate("studentId", "name email")
    .populate("courseId", "title")
    .sort({ startHour: 1 });
};

exports.updateScheduleStatus = async (id, status) => {
  return await Schedule.findByIdAndUpdate(id, { status }, { new: true });
};
