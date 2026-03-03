const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const AppError = require("../utils/AppError");
//tạo chương
exports.createChapter = async (courseId, title, order, description) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  //tự động sắp xếp chương
  if (order === undefined) {
    const lastChapter = await Chapter.findOne({
      courseId,
      isDeleted: false,
    }).sort({ order: -1 });

    order = lastChapter ? lastChapter.order + 1 : 1;
  }

  const chapter = await Chapter.create({
    courseId,
    title,
    description,
    order,
  });

  return chapter;
};
//lấy chương theo id khóa học
exports.getChaptersByCourseId = async (courseId, isAdmin = false) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const filter = {
    courseId,
    isDeleted: false,
  };

  if (!isAdmin) {
    filter.isPublished = true;
  }

  return Chapter.find(filter).sort({ order: 1 });
};
//cập nhật chương
exports.updateChapter = async (chapterId, data) => {
  const chapter = await Chapter.findOne({
    _id: chapterId,
    isDeleted: false,
  });

  if (!chapter) {
    throw new AppError("Chapter not found", 404);
  }

  //các field hợp lệ khi cập nhật chương
  const allowedFields = ["title", "order", "isPublished"];
  Object.keys(data).forEach((key) => {
    if (allowedFields.includes(key)) {
      chapter[key] = data[key];
    }
  });

  await chapter.save();
  return chapter;
};
//xóa chương
exports.deleteChapter = async (chapterId) => {
  const chapter = await Chapter.findOne({
    _id: chapterId,
    isDeleted: false,
  });

  if (!chapter) {
    throw new AppError("Chapter not found", 404);
  }

  const courseId = chapter.courseId;
  const deletedOrder = chapter.order;

  //Xóa lesson thuộc chapter
  await Lesson.deleteMany({ chapterId });

  //Xóa chapter
  await chapter.deleteOne();

  //Cập nhật lại thứ tự của các chapter còn lại
  await Chapter.updateMany(
    {
      courseId,
      order: { $gt: deletedOrder },
    },
    { $inc: { order: -1 } },
  );

  return true;
};
//Sắp xếp lại thứ tự chương
exports.reorderChapters = async (chapters) => {
  const bulkOps = chapters.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { order: item.order },
    },
  }));

  await Chapter.bulkWrite(bulkOps);

  return true;
};
