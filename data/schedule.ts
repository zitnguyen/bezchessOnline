/**
 * Mock Schedule/Lessons Data
 */

export type ScheduleLesson = {
  id: string
  studentName: string
  studentId: string
  lessonName: string
  time: string
  level: "Beginner" | "Intermediate" | "Advanced"
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  dayOfWeek: number // 0=Sunday, 1=Monday, etc.
  startHour: number // 24-hour format
}

export const mockLessons: ScheduleLesson[] = [
  {
    id: "1",
    studentName: "Nguyễn Văn A",
    studentId: "SV001",
    lessonName: "Cơ bản cờ tướng",
    time: "06:00 - 07:00",
    level: "Beginner",
    status: "scheduled",
    dayOfWeek: 1,
    startHour: 6,
  },
  {
    id: "2",
    studentName: "Trần Thị B",
    studentId: "SV002",
    lessonName: "Kỹ thuật nâng cao",
    time: "07:00 - 08:00",
    level: "Advanced",
    status: "scheduled",
    dayOfWeek: 1,
    startHour: 7,
  },
  {
    id: "3",
    studentName: "Lê Văn C",
    studentId: "SV003",
    lessonName: "Luyện thi",
    time: "09:00 - 10:00",
    level: "Intermediate",
    status: "ongoing",
    dayOfWeek: 2,
    startHour: 9,
  },
  {
    id: "4",
    studentName: "Phạm Thị D",
    studentId: "SV004",
    lessonName: "Cơ bản cờ tướng",
    time: "10:00 - 11:00",
    level: "Beginner",
    status: "scheduled",
    dayOfWeek: 3,
    startHour: 10,
  },
  {
    id: "5",
    studentName: "Hoàng Văn E",
    studentId: "SV005",
    lessonName: "Kỹ thuật nâng cao",
    time: "14:00 - 15:00",
    level: "Advanced",
    status: "scheduled",
    dayOfWeek: 4,
    startHour: 14,
  },
  {
    id: "6",
    studentName: "Đặng Thị F",
    studentId: "SV006",
    lessonName: "Cơ bản cờ tướng",
    time: "15:00 - 16:00",
    level: "Beginner",
    status: "completed",
    dayOfWeek: 5,
    startHour: 15,
  },
]
