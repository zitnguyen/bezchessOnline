const Enrollment = require("../models/Enrollment");
const AppError = require("../utils/AppError");

//đăng ký khóa học
exports.createEnrollment = async (userId, courseId) => {
  const existingEnrollment = await Enrollment.findOne({
    userId,
    courseId,
    status: "active",
  });

  if (existingEnrollment) {
    throw new AppError("You are already enrolled in this course", 400);
  }

  const enrollment = await Enrollment.create({
    userId,
    courseId,
    status: "active",
    enrolledAt: new Date(),
  });

  return enrollment.populate("courseId", "title slug price");
};

//kiểm tra quyền truy cập khóa học
exports.checkCourseAccess = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({
    userId,
    courseId,
    status: "active",
  });

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 403);
  }

  if (enrollment.expiresAt && enrollment.expiresAt < new Date()) {
    enrollment.status = "expired";
    await enrollment.save();
    throw new AppError("Your course access has expired", 403);
  }

  return enrollment;
};

//lấy danh sách khóa học của học viên
exports.getMyCourses = async (userId) => {
  const enrollments = await Enrollment.find({
    userId,
    status: "active",
  })
    .populate("courseId")
    .lean();

  return enrollments.map((e) => ({
    enrollmentId: e._id,
    progress: e.progress,
    isCompleted: e.isCompleted,
    enrolledAt: e.enrolledAt,
    expiresAt: e.expiresAt,
    course: e.courseId,
  }));
};

//thu hồi quyền truy cập khóa học
exports.revokeEnrollment = async (enrollmentId) => {
  const enrollment = await Enrollment.findById(enrollmentId);

  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  enrollment.status = "revoked";
  await enrollment.save();

  return enrollment;
};

//lấy danh sách học viên của khóa học
exports.getCourseStudents = async (courseId) => {
  const students = await Enrollment.find({
    courseId,
    status: "active",
  })
    .populate("userId", "username email")
    .lean();

  return students.map((e) => ({
    student: e.userId,
    progress: e.progress,
    isCompleted: e.isCompleted,
    enrolledAt: e.enrolledAt,
    expiresAt: e.expiresAt,
  }));
};

//hoàn thành bài học
exports.completeLesson = async (userId, lesson) => {
  const enrollment = await Enrollment.findOne({
    userId,
    courseId: lesson.courseId,
    status: "active",
  });

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 403);
  }

  if (enrollment.expiresAt && enrollment.expiresAt < new Date()) {
    enrollment.status = "expired";
    await enrollment.save();
    throw new AppError("Your course access has expired", 403);
  }

  await enrollment.markLessonCompleted(lesson._id);

  return enrollment;
};
//lấy tiến độ khóa học
exports.getCourseProgress = async (userId, courseId) => {
  const enrollment = await Enrollment.findOne({
    userId,
    courseId,
    status: "active",
  }).lean();

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 403);
  }

  return {
    progress: enrollment.progress,
    isCompleted: enrollment.isCompleted,
    completedLessons: enrollment.completedLessons,
    lastAccessedAt: enrollment.lastAccessedAt,
  };
};
