/**
 * Mock Users & Students Data
 * Strongly typed with @/types
 */

import type { User, UserProfile, Student } from "@/types"

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-001",
    email: "nguyen.minh.tuan@email.com",
    name: "Nguyễn Minh Tuấn",
    phone: "0912345678",
    role: "user",
    isActive: true,
    avatar: "/images/avatars/user-1.jpg",
    lastLogin: "2026-02-27T10:30:00Z",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-27T10:30:00Z",
  },
  {
    id: "user-002",
    email: "tran.thu.ha@email.com",
    name: "Trần Thu Hà",
    phone: "0923456789",
    role: "user",
    isActive: true,
    avatar: "/images/avatars/user-2.jpg",
    lastLogin: "2026-02-26T15:45:00Z",
    createdAt: "2026-01-15T09:30:00Z",
    updatedAt: "2026-02-26T15:45:00Z",
  },
  {
    id: "admin-001",
    email: "admin@school.local",
    name: "Admin User",
    role: "admin",
    isActive: true,
    avatar: "/images/avatars/admin.jpg",
    lastLogin: "2026-02-27T08:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-02-27T08:00:00Z",
  },
]

// Mock User Profiles (detailed)
export const mockUserProfiles: UserProfile[] = [
  {
    id: "user-001",
    email: "nguyen.minh.tuan@email.com",
    name: "Nguyễn Minh Tuấn",
    phone: "0912345678",
    role: "user",
    isActive: true,
    avatar: "/images/avatars/user-1.jpg",
    lastLogin: "2026-02-27T10:30:00Z",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-27T10:30:00Z",
    birthDate: "2010-05-15",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    bio: "Học sinh yêu thích cờ vua, đang theo học khóa cơ bản",
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      language: "vi",
    },
  },
]

// Mock Students (for admin attendance/management)
export const mockStudents: Student[] = [
  {
    id: "st-001",
    name: "Nguyễn Văn An",
    studentId: "SV001",
    progress: 85,
    avatar: "/images/avatars/student-1.jpg",
    birthDate: "2016-03-15",
    email: "an.nguyen.2016@email.com",
    phone: "0901234567",
  },
  {
    id: "st-002",
    name: "Trần Thị Bảo",
    studentId: "SV002",
    progress: 92,
    avatar: "/images/avatars/student-2.jpg",
    birthDate: "2015-07-22",
    email: "bao.tran.2015@email.com",
  },
  {
    id: "st-003",
    name: "Lê Hoàng Cường",
    studentId: "SV003",
    progress: 78,
    avatar: "/images/avatars/student-3.jpg",
    birthDate: "2016-11-08",
    phone: "0912345678",
  },
  {
    id: "st-004",
    name: "Phạm Thị Diệu",
    studentId: "SV004",
    progress: 88,
    avatar: "/images/avatars/student-4.jpg",
    birthDate: "2015-09-30",
    email: "dieu.pham.2015@email.com",
  },
  {
    id: "st-005",
    name: "Hoàng Văn Em",
    studentId: "SV005",
    progress: 95,
    avatar: "/images/avatars/student-5.jpg",
    birthDate: "2017-01-12",
  },
  {
    id: "st-006",
    name: "Đỗ Thị Phương",
    studentId: "SV006",
    progress: 82,
    avatar: "/images/avatars/student-6.jpg",
    birthDate: "2016-06-19",
    email: "phuong.do.2016@email.com",
    phone: "0923456789",
  },
  {
    id: "st-007",
    name: "Vũ Minh Giang",
    studentId: "SV007",
    progress: 90,
    birthDate: "2015-04-25",
  },
  {
    id: "st-008",
    name: "Bùi Thị Hà",
    studentId: "SV008",
    progress: 87,
    avatar: "/images/avatars/student-8.jpg",
    birthDate: "2016-08-03",
    email: "ha.bui.2016@email.com",
  },
]

// Admin Students List (for student management page)
type AdminStudent = {
  id: number
  code: string
  name: string
  avatar?: string
  birthDate?: string
  joinDate?: string
  level: "Kid1" | "Kid2" | "Kid3" | "Level1" | "Level2" | "Level3"
  phone?: string
  email?: string
}

export const adminStudents: AdminStudent[] = [
  {
    id: 1,
    code: "HV001",
    name: "Nguyễn Văn An",
    birthDate: "15/03/2016",
    joinDate: "01/01/2026",
    level: "Kid2",
    phone: "0901234567",
    email: "nguyenvanan@email.com"
  },
  {
    id: 2,
    code: "HV002",
    name: "Trần Thị Bảo",
    birthDate: "22/07/2015",
    joinDate: "05/01/2026",
    level: "Kid3",
  },
  {
    id: 3,
    code: "HV003",
    name: "Lê Minh Châu",
    joinDate: "10/01/2026",
    level: "Level1",
    phone: "0923456789",
  },
  {
    id: 4,
    code: "HV004",
    name: "Phạm Hoàng Dũng",
    birthDate: "08/11/2014",
    joinDate: "12/01/2026",
    level: "Level2",
  },
  {
    id: 5,
    code: "HV005",
    name: "Hoàng Thị Em",
    birthDate: "30/05/2017",
    joinDate: "15/01/2026",
    level: "Kid1",
  },
  {
    id: 6,
    code: "HV006",
    name: "Vũ Đức Phúc",
    birthDate: "18/09/2013",
    joinDate: "18/01/2026",
    level: "Level3",
    email: "vuducphuc@email.com"
  },
]
