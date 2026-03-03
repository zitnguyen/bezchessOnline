const learningService = require("../services/learningService");
const asyncHandler = require("../middleware/asyncHandler");

exports.getMyLearning = asyncHandler(async (req, res) => {
  const learning = await learningService.getLearningByUser(req.user.id);

  res.status(200).json({
    success: true,
    message: "Learning records retrieved successfully",
    data: learning,
  });
});

exports.getLearningById = asyncHandler(async (req, res) => {
  const learning = await learningService.getLearningById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Learning record retrieved successfully",
    data: learning,
  });
});

exports.updateProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const {
    progressPercent,
    lastLessonId,
    lastLessonTitle,
    completedLessons,
    totalLessons,
  } = req.body;

  const learning = await learningService.updateProgress(req.user.id, courseId, {
    progressPercent,
    lastLessonId,
    lastLessonTitle,
    completedLessons,
    totalLessons,
  });

  res.status(200).json({
    success: true,
    message: "Progress updated successfully",
    data: learning,
  });
});

exports.markLessonComplete = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;

  const learning = await learningService.markLessonComplete(
    req.user.id,
    courseId,
    lessonId,
  );

  res.status(200).json({
    success: true,
    message: "Lesson marked as complete",
    data: learning,
  });
});

exports.getProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const progress = await learningService.getLearningProgress(
    req.user.id,
    courseId,
  );

  res.status(200).json({
    success: true,
    message: "Learning progress retrieved successfully",
    data: progress,
  });
});

exports.deleteLearning = asyncHandler(async (req, res) => {
  await learningService.deleteLearning(req.params.id);

  res.status(200).json({
    success: true,
    message: "Learning record deleted successfully",
  });
});
