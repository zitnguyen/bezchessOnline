const Course = require("../models/Course");
const slugify = require("slugify");
const AppError = require("../utils/AppError");

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

//sinh slug duy nhất cho khóa học, nếu đã tồn tại thì thêm số vào cuối
const generateUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Course.findOne({
      slug,
      ...(excludeId && { _id: { $ne: excludeId } }),
    }).lean();

    if (!existing) break;

    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

//tạo khóa học
exports.createCourse = async (data, instructorId) => {
  if (!data.title || data.title.trim() === "") {
    throw new AppError("Title is required", 400);
  }

  const slug = await generateUniqueSlug(data.title);

  const course = await Course.create({
    ...data,
    slug,
    instructor: instructorId,
  });

  return course;
};

//lấy danh sách khóa học với phân trang, lọc theo category, level và tìm kiếm theo title
exports.getAllCourses = async (query) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 10, 1);

  const filter = {
    isDeleted: false,
    isPublished: true,
  };

  if (query.category) {
    // Category là array trong model, nên dùng $in để query
    filter.category = { $in: [query.category] };
  }
  if (query.level) filter.level = query.level;

  if (query.search) {
    const safeSearch = escapeRegex(query.search);
    filter.title = { $regex: safeSearch, $options: "i" };
  }

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .select("-__v")
      .populate("instructor", "username email")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit),

    Course.countDocuments(filter),
  ]);

  const Chapter = require("../models/Chapter");
  const Lesson = require("../models/Lesson");

  const plainCourses = await Promise.all(
    courses.map(async (c) => {
      const chapters = await Chapter.find({ courseId: c._id, isDeleted: false })
        .select("-__v -courseId")
        .sort({ order: 1 });

      const curriculumWithLessons = await Promise.all(
        chapters.map(async (chapter) => {
          const lessons = await Lesson.find({
            chapterId: chapter._id,
            isDeleted: false,
          })
            .select("-__v -chapterId")
            .sort({ order: 1 });
          return {
            ...chapter.toObject(),
            lessons,
          };
        }),
      );

      const courseObj = c.toObject({ virtuals: true });
      courseObj.curriculum = curriculumWithLessons;
      return courseObj;
    }),
  );

  return {
    courses: plainCourses,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
//lấy chi tiết khóa học theo id hoặc slug, nếu là admin thì có thể xem cả khóa học chưa publish
exports.getCourseById = async (idOrSlug, isAdmin = false) => {
  const query = { isDeleted: false };

  if (!isAdmin) {
    query.isPublished = true;
  }

  if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug;
  }

  const course = await Course.findOne(query)
    .select("-__v")
    .populate("instructor", "username email");

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  const Chapter = require("../models/Chapter");
  const Lesson = require("../models/Lesson");

  const chapters = await Chapter.find({
    courseId: course._id,
    isDeleted: false,
  })
    .select("-__v -courseId")
    .sort({ order: 1 });

  const curriculumWithLessons = await Promise.all(
    chapters.map(async (chapter) => {
      const lessons = await Lesson.find({
        chapterId: chapter._id,
        isDeleted: false,
      })
        .select("-__v -chapterId")
        .sort({ order: 1 });
      return {
        ...chapter.toObject(),
        lessons,
      };
    }),
  );

  const courseObj = course.toObject({ virtuals: true });
  courseObj.curriculum = curriculumWithLessons;

  return courseObj;
};
//cập nhật khóa học
exports.updateCourse = async (id, data, instructorId, userRole) => {
  const course = await Course.findById(id);

  if (!course || course.isDeleted) {
    throw new AppError("Course not found", 404);
  }

  const isOwner = course.instructor.toString() === instructorId.toString();

  if (!isOwner && userRole !== "admin") {
    throw new AppError("Not authorized", 403);
  }

  const allowedFields = [
    "title",
    "description",
    "price",
    "salePrice",
    "level",
    "category",
    "tags",
    "thumbnail",
    "rating",
    "totalReviews",
    "totalStudents",
    "hasCertificate",
    "reviews",
    "whatYouWillLearn",
  ];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      course[field] = data[field];
    }
  }

  // Chỉ admin mới được publish/unpublish
  if (data.isPublished !== undefined) {
    if (userRole !== "admin") {
      throw new AppError("Only admin can change publish status", 403);
    }
    course.isPublished = data.isPublished;
  }

  if (data.title) {
    course.slug = await generateUniqueSlug(data.title, id);
  }

  await course.save();

  return course;
};
//xóa khóa học
exports.deleteCourse = async (id, instructorId, userRole) => {
  const course = await Course.findById(id);

  if (!course || course.isDeleted) {
    throw new AppError("Course not found", 404);
  }

  const isOwner = course.instructor.toString() === instructorId.toString();

  if (!isOwner && userRole !== "admin") {
    throw new AppError("Not authorized", 403);
  }

  course.isDeleted = true;
  await course.save();

  return { message: "Course deleted successfully" };
};

//lấy danh sách khóa học(admin)
exports.getAllCoursesForAdmin = async (query) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 10, 1);

  const filter = { isDeleted: false };

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .select("-__v")
      .populate("instructor", "username email")
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit),

    Course.countDocuments(filter),
  ]);

  const Chapter = require("../models/Chapter");
  const Lesson = require("../models/Lesson");

  const plainCourses = await Promise.all(
    courses.map(async (c) => {
      const chapters = await Chapter.find({ courseId: c._id, isDeleted: false })
        .select("-__v -courseId")
        .sort({ order: 1 });

      const curriculumWithLessons = await Promise.all(
        chapters.map(async (chapter) => {
          const lessons = await Lesson.find({
            chapterId: chapter._id,
            isDeleted: false,
          })
            .select("-__v -chapterId")
            .sort({ order: 1 });
          return {
            ...chapter.toObject(),
            lessons,
          };
        }),
      );

      const courseObj = c.toObject({ virtuals: true });
      courseObj.curriculum = curriculumWithLessons;
      return courseObj;
    }),
  );

  return {
    courses: plainCourses,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
