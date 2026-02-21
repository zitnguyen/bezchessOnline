const Lesson = require("../models/Lesson");
const Chapter = require("../models/Chapter");
const Enrollment = require("../models/Enrollment");
const AppError = require("../utils/AppError");

//tạo bài học
exports.createLesson = async (chapterId, data) => {
  const chapter = await Chapter.findById(chapterId);

  if (!chapter) {
    throw new AppError("Chapter not found", 404);
  }

  const lessonCount = await Lesson.countDocuments({ chapterId });

  const lesson = await Lesson.create({
    ...data,
    chapterId,
    order: lessonCount + 1,
  });

  return lesson;
};
//lấy danh sách bài học theo chương
exports.getLessonsByChapterId = async (chapterId) => {
  return await Lesson.find({ chapterId }).sort("order");
};
//lấy chi tiết bài học
exports.getLessonForUser = async (lessonId, userId) => {
  const lesson = await Lesson.findById(lessonId).populate({
    path: "chapterId",
    populate: { path: "courseId" },
  });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  const courseId = lesson.chapterId.courseId;

  const enrollment = await Enrollment.findOne({
    userId,
    courseId,
    status: "active",
  });

  if (!enrollment) {
    throw new AppError("You are not enrolled in this course", 403);
  }

  return lesson;
};
//cập nhật bài học
exports.updateLesson = async (lessonId, data) => {
  const lesson = await Lesson.findByIdAndUpdate(lessonId, data, { new: true });

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }

  return lesson;
};
//xóa bài học
exports.deleteLesson = async (lessonId) => {
  const lesson = await Lesson.findByIdAndDelete(lessonId);

  if (!lesson) {
    throw new AppError("Lesson not found", 404);
  }
};
//thay đổi thứ tự bài học
exports.reorderLessons = async (chapterId, lessons) => {
  for (const item of lessons) {
    await Lesson.findOneAndUpdate(
      { _id: item.lessonId, chapterId },
      { order: item.order },
    );
  }
};
