const Learning = require("../models/Learning");
const Enrollment = require("../models/Enrollment");
const AppError = require("../utils/AppError");

// Helper to calculate estimated time remaining (minutes)
const calculateEstimatedTimeRemaining = (
  totalLessons,
  completedLessons,
  totalDuration,
) => {
  if (totalLessons === 0) return 0;
  const remainingLessons = totalLessons - completedLessons;
  const averageTimePerLesson = totalDuration / totalLessons;
  return Math.round(remainingLessons * averageTimePerLesson);
};

// Helper to enrich learning with course data
const enrichLearningData = (learning) => {
  const course = learning.courseId;
  const estimatedTime = calculateEstimatedTimeRemaining(
    learning.totalLessons,
    learning.completedLessons,
    course?.totalDuration || 0,
  );

  return {
    ...learning.toObject(),
    title: course?.title,
    thumbnail: course?.thumbnail,
    level: course?.level,
    teacherName: course?.instructor?.name,
    estimatedTimeRemaining: estimatedTime,
  };
};

exports.createLearning = async (data) => {
  return await Learning.create(data);
};

exports.getLearningByUser = async (userId) => {
  const learnings = await Learning.find({ userId })
    .populate({
      path: "courseId",
      select: "title thumbnail level totalDuration instructor",
      populate: {
        path: "instructor",
        select: "name",
      },
    })
    .sort({ updatedAt: -1 });

  return learnings.map(enrichLearningData);
};

exports.getLearningById = async (id) => {
  const learning = await Learning.findById(id).populate({
    path: "courseId",
    select: "title thumbnail level totalDuration instructor",
    populate: {
      path: "instructor",
      select: "name",
    },
  });
  if (!learning) {
    throw new AppError("Learning record not found", 404);
  }
  return enrichLearningData(learning);
};

exports.updateProgress = async (userId, courseId, progressData) => {
  let learning = await Learning.findOne({ userId, courseId });

  if (!learning) {
    learning = await Learning.create({
      userId,
      courseId,
      ...progressData,
    });
  } else {
    Object.assign(learning, progressData);
    await learning.save();
  }

  // Populate course data for enriched response
  await learning.populate({
    path: "courseId",
    select: "title thumbnail level totalDuration instructor",
    populate: {
      path: "instructor",
      select: "name",
    },
  });

  return enrichLearningData(learning);
};

exports.markLessonComplete = async (userId, courseId, lessonId) => {
  const learning = await Learning.findOne({ userId, courseId }).populate({
    path: "courseId",
    select: "title thumbnail level totalDuration instructor",
    populate: {
      path: "instructor",
      select: "name",
    },
  });

  if (!learning) {
    throw new AppError("Learning record not found", 404);
  }

  if (!learning.completedLessonIds.includes(lessonId)) {
    learning.completedLessonIds.push(lessonId);
    learning.completedLessons = learning.completedLessonIds.length;
    learning.lastLessonId = lessonId;
    learning.progressPercent = Math.round(
      (learning.completedLessons / learning.totalLessons) * 100,
    );
    await learning.save();
  }

  return enrichLearningData(learning);
};

exports.getLearningProgress = async (userId, courseId) => {
  const learning = await Learning.findOne({ userId, courseId }).populate({
    path: "courseId",
    select: "title thumbnail level totalDuration instructor",
    populate: {
      path: "instructor",
      select: "name",
    },
  });
  if (!learning) {
    throw new AppError("Learning record not found", 404);
  }
  return enrichLearningData(learning);
};

exports.deleteLearning = async (id) => {
  const learning = await Learning.findByIdAndDelete(id);
  if (!learning) {
    throw new AppError("Learning record not found", 404);
  }
  return learning;
};
