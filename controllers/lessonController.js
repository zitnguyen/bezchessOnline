const lessonService = require("../services/lessonService");

//tạo bài học
exports.createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(
      req.params.chapterId,
      req.body,
    );

    res.status(201).json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};
//lấy tất cả bài học của một chương
exports.getChapterLessons = async (req, res, next) => {
  try {
    const lessons = await lessonService.getLessonsByChapterId(
      req.params.chapterId,
    );

    res.json({
      status: "success",
      results: lessons.length,
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};
//lấy bài học cho người dùng (kiểm tra quyền truy cập)
exports.getLessonForUser = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonForUser(
      req.params.lessonId,
      req.user.id,
    );

    res.json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};
//cập nhật bài học
exports.updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);

    res.json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};
//xóa bài học
exports.deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);

    res.json({
      status: "success",
      message: "Bài học đã được xóa thành công",
    });
  } catch (error) {
    next(error);
  }
};
//thay đổi thứ tự bài học
exports.reorderLessons = async (req, res, next) => {
  try {
    const { chapterId, lessons } = req.body;

    await lessonService.reorderLessons(chapterId, lessons);

    res.json({
      status: "success",
      message: "Thay đổi thứ tự bài học thành công",
    });
  } catch (error) {
    next(error);
  }
};
