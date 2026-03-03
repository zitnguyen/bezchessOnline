const enrollmentService = require("../services/enrollmentService");
const asyncHandler = require("../middleware/asyncHandler");

//Đăng ký khóa học
exports.createEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const enrollment = await enrollmentService.createEnrollment(userId, courseId);

  res.status(201).json({
    success: true,
    message: "Enrolled in course successfully",
    data: enrollment,
  });
});

//Lấy danh sách khóa học đã đăng ký
exports.getMyCourses = asyncHandler(async (req, res) => {
  const data = await enrollmentService.getMyCourses(req.user.id);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});
//Thu hồi quyền truy cập khóa học (Admin)
exports.revokeEnrollment = asyncHandler(async (req, res) => {
  await enrollmentService.revokeEnrollment(req.params.id);

  res.status(200).json({
    success: true,
    message: "Đã thu hồi quyền truy cập khóa học",
  });
});

//Lấy danh sách học viên của khóa học (Admin)
exports.getCourseStudents = asyncHandler(async (req, res) => {
  const students = await enrollmentService.getCourseStudents(
    req.params.courseId,
  );

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});
//Lấy tiến độ học tập của học viên trong khóa học
exports.getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const progress = await enrollmentService.getCourseProgress(
    req.user.id,
    courseId,
  );

  res.status(200).json({
    success: true,
    data: progress,
  });
});
