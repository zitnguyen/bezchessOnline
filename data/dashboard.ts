/**
 * Mock Dashboard Data
 * Strongly typed with @/types
 */

import type { DashboardStats, RevenueData, LevelDistribution, Lead } from "@/types"

// Mock KPI data
export const getDashboardStats = (period: "today" | "month" | "year"): DashboardStats => {
  const baseStats: DashboardStats = {
    totalStudents: 124,
    totalCoursesOffered: 12,
    newRegistrationsToday: 3,
    registrationConversionRate: 65,
    activeClasses: 8,
    totalRevenue: 68000000, // VND
    averageRevenuePerStudent: 548389,
    studentRetentionRate: 82,
  }

  if (period === "today") {
    return {
      ...baseStats,
      newRegistrationsToday: 3,
      totalRevenue: 2500000,
      activeClasses: 4,
    }
  }

  if (period === "year") {
    return {
      ...baseStats,
      totalStudents: 451, // more students in year view
      newRegistrationsToday: 45,
      totalRevenue: 720000000,
    }
  }

  return baseStats
}

// Mock revenue data
export const mockRevenueData: RevenueData[] = [
  { month: "T9", revenue: 45000000, label: "Tháng 9/2025" },
  { month: "T10", revenue: 52000000, label: "Tháng 10/2025" },
  { month: "T11", revenue: 48000000, label: "Tháng 11/2025" },
  { month: "T12", revenue: 65000000, label: "Tháng 12/2025" },
  { month: "T1", revenue: 71000000, label: "Tháng 1/2026" },
  { month: "T2", revenue: 68000000, label: "Tháng 2/2026" },
]

// Mock level distribution
export const mockLevelDistribution: LevelDistribution[] = [
  { name: "Cơ bản", value: 45, color: "hsl(var(--chart-1))", percentage: 36 },
  { name: "Trung bình", value: 38, color: "hsl(var(--chart-2))", percentage: 31 },
  { name: "Nâng cao", value: 25, color: "hsl(var(--chart-3))", percentage: 20 },
  { name: "Chuyên nghiệp", value: 16, color: "hsl(var(--chart-4))", percentage: 13 },
]

// Mock leads/registrations
export const mockLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Lê Minh Châu",
    email: "minh.chau@email.com",
    phone: "0934567890",
    courseInterest: "opening-basics-e4",
    ageGroup: "13-18",
    status: "new",
    createdAt: "2026-02-27T10:15:00Z",
    notes: "Interested in beginner courses for teen",
  },
  {
    id: "lead-002",
    name: "Phạm Hoàng Long",
    email: "hoang.long@email.com",
    phone: "0945678901",
    courseInterest: "tactics-intermediate",
    ageGroup: "19+",
    status: "contacted",
    createdAt: "2026-02-26T14:30:00Z",
    notes: "Already enrolled in free course",
  },
  {
    id: "lead-003",
    name: "Ngô Thị Hương",
    email: "thi.huong@email.com",
    phone: "0956789012",
    courseInterest: "masterclass-carlsen",
    ageGroup: "19+",
    status: "interested",
    createdAt: "2026-02-25T09:00:00Z",
  },
  {
    id: "lead-004",
    name: "Đặng Văn Kiên",
    email: "van.kien@email.com",
    phone: "0967890123",
    courseInterest: "endgame-mastery",
    ageGroup: "13-18",
    status: "converted",
    createdAt: "2026-02-20T11:45:00Z",
    notes: "Converted to enrolled student",
  },
  {
    id: "lead-005",
    name: "Vương Thị Yên",
    email: "thi.yen@email.com",
    phone: "0978901234",
    courseInterest: "defense-techniques",
    ageGroup: "19+",
    status: "lost",
    createdAt: "2026-02-18T16:20:00Z",
    notes: "No response after 2 contacts",
  },
]
