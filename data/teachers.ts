/**
 * Mock Teachers Data
 * Strongly typed with @/types
 */

import type { Teacher } from "@/types"

export const teachers: Teacher[] = [
  {
    id: "nguyen-minh-a",
    name: "FM Nguyễn Minh A",
    title: "Huấn luyện viên cờ vua trẻ",
    focus: "Trẻ em 6–10 tuổi · Lớp cơ bản & nâng cao",
    bio: "8+ năm huấn luyện trẻ em, tập trung xây dựng nền tảng tư duy và thói quen phân tích cho học viên nhỏ tuổi.",
    achievements: [
      "FM (FIDE Master)",
      "HLV đội tuyển cờ vua thiếu nhi quận X",
      "Nhiều học viên đạt huy chương các giải trẻ thành phố",
    ],
    avatar: "/images/teachers/nguyen-minh-a.jpg",
    email: "nguyen.minh.a@school.local",
    phone: "+84912345678",
    specializations: ["tactics", "opening", "endgame"],
    yearsOfExperience: 8,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    bio_extended:
      "FM Nguyễn Minh A là một huấn luyện viên dày dạn kinh nghiệm với 8+ năm huấn luyện trẻ em. Chuyên biệt trong việc xây dựng nền tảng vững chắc cho các học sinh trẻ, anh tập trung vào phát triển khả năng tư duy phân tích và kỷ luật trong chơi.",
  },
  {
    id: "tran-bao-b",
    name: "IM Trần Bảo B",
    title: "Huấn luyện viên thi đấu",
    focus: "Học viên thi đấu · Nâng cao",
    bio: "Tập trung vào chiến lược trung cuộc, phân tích ván đấu và chuẩn bị giải cho học viên trình độ cao.",
    achievements: [
      "IM (International Master)",
      "Top 10 giải vô địch quốc gia nhiều năm",
      "Huấn luyện nhiều vận động viên đạt chuẩn kiện tướng trẻ",
    ],
    avatar: "/images/teachers/tran-bao-b.jpg",
    email: "tran.bao.b@school.local",
    phone: "+84923456789",
    specializations: ["tactics", "endgame", "defense"],
    yearsOfExperience: 12,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    bio_extended:
      "IM Trần Bảo B là một huấn luyện viên chuyên nghiệp với sự đào tạo cho các vận động viên cạnh tranh. Với xếp hạng IM, anh mang lại kinh nghiệm từ cấp độ quốc tế.",
  },
  {
    id: "le-thao-c",
    name: "Coach Lê Thảo C",
    title: "Coach cờ vua cho teen & người lớn",
    focus: "Teen 13–18 tuổi · Người lớn mới chơi",
    bio: "Kết hợp cờ vua với kỹ năng tư duy phản biện và quản lý cảm xúc, phù hợp với teen và người lớn bận rộn.",
    achievements: [
      "10+ năm chơi và giảng dạy cờ vua",
      "Đồng hành cùng nhiều học viên người lớn bắt đầu từ con số 0",
    ],
    avatar: "/images/teachers/le-thao-c.jpg",
    email: "le.thao.c@school.local",
    phone: "+84934567890",
    specializations: ["opening", "tactics"],
    yearsOfExperience: 10,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    bio_extended:
      "Coach Lê Thảo C là một nhà huấn luyện đặc biệt trong việc làm cho cờ vua trở nên thú vị và dễ tiếp cận cho người mới bắt đầu.",
  },
]

// Admin Teacher type (extended for admin management)
export type AdminTeacher = {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: "active" | "inactive" | "on-leave"
  subjects: string[]
  level: string[]
  experience: number // years
  classes: Array<{
    id: string
    name: string
    level: string
    students: number
  }>
  schedule: Array<{
    day: string
    time: string
    class: string
  }>
  rating?: number
  achievements: string[]
}

export const adminTeachers: AdminTeacher[] = [
  {
    id: "1",
    name: "FM Nguyễn Minh A",
    email: "nguyen.minh.a@zchess.vn",
    phone: "0901234567",
    avatar: "/images/teachers/nguyen-minh-a.jpg",
    status: "active",
    subjects: ["Cờ vua cơ bản", "Chiến thuật"],
    level: ["Beginner", "Intermediate"],
    experience: 8,
    classes: [
      { id: "c1", name: "Cơ bản A1", level: "Beginner", students: 12 },
      { id: "c2", name: "Nâng cao B2", level: "Intermediate", students: 8 },
    ],
    schedule: [
      { day: "Thứ 2", time: "18:00-19:30", class: "Cơ bản A1" },
      { day: "Thứ 4", time: "18:00-19:30", class: "Nâng cao B2" },
      { day: "Thứ 6", time: "19:00-20:30", class: "Cơ bản A1" },
    ],
    rating: 4.8,
    achievements: ["FM (FIDE Master)", "HLV đội tuyển quận X"],
  },
  {
    id: "2",
    name: "IM Trần Bảo B",
    email: "tran.bao.b@zchess.vn",
    phone: "0907654321",
    status: "active",
    subjects: ["Chiến lược", "Thi đấu"],
    level: ["Advanced", "Expert"],
    experience: 12,
    classes: [
      { id: "c3", name: "Thi đấu C1", level: "Advanced", students: 6 },
    ],
    schedule: [
      { day: "Thứ 3", time: "19:00-21:00", class: "Thi đấu C1" },
      { day: "Thứ 5", time: "19:00-21:00", class: "Thi đấu C1" },
    ],
    rating: 4.9,
    achievements: ["IM (International Master)", "Top 10 quốc gia"],
  },
  {
    id: "3",
    name: "Coach Lê Thảo C",
    email: "le.thao.c@zchess.vn",
    phone: "0903456789",
    status: "on-leave",
    subjects: ["Cờ vua thiếu nhi", "Tư duy logic"],
    level: ["Beginner"],
    experience: 5,
    classes: [],
    schedule: [],
    rating: 4.6,
    achievements: ["Chứng chỉ HLV thiếu nhi"],
  },
]

export const mockTeacherKPIData = {
  total: 15,
  active: 12,
  inactive: 2,
  onLeave: 1,
}

