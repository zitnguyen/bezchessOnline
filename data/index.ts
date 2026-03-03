/**
 * Barrel export for all mock data
 */

// Courses & Teachers
export * from "./courses"
export * from "./teachers"

// Users & Learning
export * from "./users"
export * from "./learning"
export * from "./attendance"

// Admin/Dashboard
export * from "./dashboard"
export * from "./schedule"
export * from "./parents"
export * from "./finance"

// Forms
export * from "./contact"

// Home page
export * from "./home"

// Legacy exports for backward compatibility
// Re-export from new structure to avoid breaking existing imports
export { videoCourses } from "./courses"
export { teachers } from "./teachers"
export { mockLearningCourses } from "./learning"

// Ensure specific exports are available
export { adminStudents } from "./users"
export { mockRevenueData, mockLevelDistribution, getDashboardStats } from "./dashboard"
export { adminTeachers, mockTeacherKPIData, type AdminTeacher } from "./teachers"
export { mockLessons, type ScheduleLesson } from "./schedule"
export { mockParents, type Parent } from "./parents"
export { 
  mockFinanceKPIData, 
  mockFinanceChartData, 
  mockTransactions,
  type KPIData,
  type TransactionData 
} from "./finance"
export { teacherPreviews } from "./home"
