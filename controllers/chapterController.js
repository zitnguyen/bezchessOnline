const chapterService = require("../services/chapterService");
const asyncHandler = require("../middleware/asyncHandler");

//tạo chương
exports.createChapter = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const { title, order, description } = req.body;

  const chapter = await chapterService.createChapter(
    courseId,
    title,
    order,
    description,
  );

  res.status(201).json({
    success: true,
    data: chapter,
  });
});
//lấy tất cả chương của một khóa học
exports.getCourseChapters = asyncHandler(async (req, res) => {
  const isAdmin = req.user?.role === "admin";

  const chapters = await chapterService.getChaptersByCourseId(
    req.params.courseId,
    isAdmin,
  );

  res.status(200).json({
    success: true,
    data: chapters,
  });
});
//cập nhật chương
exports.updateChapter = asyncHandler(async (req, res) => {
  const chapter = await chapterService.updateChapter(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: chapter,
  });
});
//xóa chương
exports.deleteChapter = asyncHandler(async (req, res) => {
  await chapterService.deleteChapter(req.params.id);

  res.status(200).json({
    success: true,
    message: "Chương đã được xóa thành công",
  });
});
//sắp xếp lại thứ tự chương
exports.reorderChapters = asyncHandler(async (req, res) => {
  await chapterService.reorderChapters(req.body);

  res.status(200).json({
    success: true,
    message: "Thay đổi thứ tự chương thành công",
  });
});
