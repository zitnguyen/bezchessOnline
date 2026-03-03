/**
 * Mock Learning Courses Data
 * Strongly typed with @/types
 */

import type { LearningCourse } from "@/types"

export const mockLearningCourses: LearningCourse[] = [
  {
    courseId: "opening-basics-e4",
    title: "Khai cuộc cơ bản - Hệ thống e4",
    thumbnail: "/images/courses/opening-e4.jpg",
    progressPercent: 65,
    lastLessonId: "1-5",
    lastLessonTitle: "Nhập thành sớm",
    totalLessons: 32,
    completedLessons: 21,
    level: "beginner",
    teacherName: "FM Nguyễn Minh A",
    estimatedTimeRemaining: 112, // minutes
    createdAt: "2026-01-15T10:30:00Z",
    updatedAt: "2026-02-25T15:45:00Z",
  },
  {
    courseId: "tactics-intermediate",
    title: "Chiến thuật trung cấp - Nâng cao kỹ năng tính toán",
    thumbnail: "/images/courses/tactics-intermediate.jpg",
    progressPercent: 40,
    lastLessonId: "2-3",
    lastLessonTitle: "Double Attack",
    totalLessons: 45,
    completedLessons: 18,
    level: "intermediate",
    teacherName: "IM Trần Bảo B",
    estimatedTimeRemaining: 252, // minutes
    createdAt: "2026-02-01T08:20:00Z",
    updatedAt: "2026-02-26T12:10:00Z",
  },
  {
    courseId: "endgame-mastery",
    title: "Tàn cuộc từ cơ bản đến nâng cao",
    thumbnail: "/images/courses/endgame-mastery.jpg",
    progressPercent: 25,
    lastLessonId: "1-3",
    lastLessonTitle: "Vua + 2 Tượng vs Vua",
    totalLessons: 48,
    completedLessons: 12,
    level: "intermediate",
    teacherName: "IM Trần Bảo B",
    estimatedTimeRemaining: 405, // minutes
    createdAt: "2026-02-10T14:00:00Z",
    updatedAt: "2026-02-24T11:30:00Z",
  },
  {
    courseId: "defense-techniques",
    title: "Kỹ thuật phòng thủ trong cờ vua",
    thumbnail: "/images/courses/defense.jpg",
    progressPercent: 80,
    lastLessonId: "2-4",
    lastLessonTitle: "Fortress - Pháo đài",
    totalLessons: 36,
    completedLessons: 29,
    level: "advanced",
    teacherName: "IM Trần Bảo B",
    estimatedTimeRemaining: 72, // minutes
    createdAt: "2025-12-20T09:45:00Z",
    updatedAt: "2026-02-27T13:20:00Z",
  },
]
