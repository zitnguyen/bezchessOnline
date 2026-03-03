const courseService = require("../services/courseService");
const asyncHandler = require("../middleware/asyncHandler");

//tạo khóa học
exports.createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: course,
  });
});
//lấy danh sách khóa học
exports.getAllCourses = asyncHandler(async (req, res) => {
  const result = await courseService.getAllCourses(req.query);

  res.status(200).json({
    success: true,
    data: result.courses,
    pagination: {
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    },
  });
});
//lấy chi tiết khóa học
exports.getCourse = asyncHandler(async (req, res) => {
  const isAdmin = req.user?.role === "admin";

  const course = await courseService.getCourseById(req.params.id, isAdmin);

  res.status(200).json({
    success: true,
    data: course,
  });
});
//cập nhật khóa học
exports.updateCourse = asyncHandler(async (req, res) => {
  const course = await courseService.updateCourse(
    req.params.id,
    req.body,
    req.user.id,
    req.user.role,
  );

  res.status(200).json({
    success: true,
    data: course,
  });
});
//xóa khóa học
exports.deleteCourse = asyncHandler(async (req, res) => {
  await courseService.deleteCourse(req.params.id, req.user.id, req.user.role);

  res.status(200).json({
    success: true,
    message: "Khóa học đã được xóa thành công",
  });
});
//lấy danh sách khóa học(admin)
exports.getManagedCourses = asyncHandler(async (req, res) => {
  const result = await courseService.getAllCoursesForAdmin(req.query);

  res.status(200).json({
    success: true,
    data: result.courses,
    pagination: {
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    },
  });
});
