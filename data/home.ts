/**
 * Mock Home Page Data
 * FAQs, Testimonials, Achievements, USPs, Roadmap
 */

// FAQ Data
export type FAQ = {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: "Trẻ bao nhiêu tuổi thì có thể bắt đầu học cờ vua?",
    answer:
      "Thông thường trẻ từ 6 tuổi đã có thể bắt đầu làm quen với cờ vua. Với các bé nhỏ hơn, trung tâm sẽ tư vấn thêm dựa trên khả năng tập trung của bé.",
  },
  {
    question: "Một lớp tối đa bao nhiêu học viên?",
    answer:
      "Chúng tôi giới hạn sĩ số từ 8–12 học viên/lớp để giáo viên có thể quan sát và hỗ trợ từng em.",
  },
  {
    question: "Có lớp học thử không?",
    answer:
      "Tùy mỗi giai đoạn, trung tâm có thể tổ chức buổi học thử hoặc buổi trải nghiệm ngắn. Anh/chị có thể để lại thông tin để được tư vấn lịch cụ thể.",
  },
]

// Testimonial Data
export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "Sau 3 tháng học, con biết bình tĩnh hơn khi giải quyết bài toán và tự tin tham gia giải cờ vua của trường.",
    name: "Chị Lan",
    role: "Phụ huynh bé Bảo (9 tuổi)",
  },
  {
    quote: "Lớp nhỏ, cô giáo rất kiên nhẫn, con rất háo hức mỗi lần đến lớp, về nhà cũng chủ động xin chơi cờ với ba mẹ.",
    name: "Anh Hùng",
    role: "Phụ huynh bé Vy (7 tuổi)",
  },
  {
    quote: "Là người mới chơi, mình được hệ thống lại từ cơ bản đến chiến thuật thực chiến, rất phù hợp sau giờ làm việc.",
    name: "Anh Minh",
    role: "Học viên lớp Chess for Adults",
  },
]

// Achievements Data
export type Achievement = {
  value: string
  label: string
  description: string
}

export const achievements: Achievement[] = [
  {
    value: "50+",
    label: "Huy chương",
    description: "Từ các giải cờ vua trẻ cấp trường, quận, thành phố.",
  },
  {
    value: "10+",
    label: "Học viên đạt chuẩn kiện tướng trẻ",
    description: "Được liên đoàn công nhận, tiếp tục thi đấu ở cấp độ cao hơn.",
  },
  {
    value: "95%",
    label: "Phụ huynh hài lòng",
    description: "Đánh giá con tiến bộ rõ sau mỗi khóa học tại trung tâm.",
  },
]

// USP (Unique Selling Points) Data
export type USP = {
  title: string
  description: string
}

export const usps: USP[] = [
  {
    title: "Giáo viên kiện tướng, sư phạm vững",
    description:
      "Đội ngũ huấn luyện viên có thành tích thi đấu, kinh nghiệm dạy trẻ nhiều năm.",
  },
  {
    title: "Lộ trình rõ ràng theo level",
    description:
      "Từ cơ bản đến thi đấu, đánh giá đầu vào và theo dõi tiến bộ mỗi khóa.",
  },
  {
    title: "Lớp nhỏ, cá nhân hóa",
    description:
      "Sĩ số giới hạn để giáo viên kèm sát từng học viên.",
  },
  {
    title: "Kết nối chặt với phụ huynh",
    description:
      "Báo cáo tiến độ định kỳ, tư vấn lộ trình thi đấu khi phù hợp.",
  },
]

// Roadmap Data
export type RoadmapLevel = {
  id: string
  number: number
  name: string
  subtitle: string
  objective: string
  outcomes: string[]
  duration: string
  deliverable: string
}

export const roadmapLevels: RoadmapLevel[] = [
  {
    id: "01",
    number: 1,
    name: "Khai cuộc",
    subtitle: "Làm quen",
    objective: "Nắm luật, giá trị quân, nguyên tắc khai cuộc cơ bản",
    outcomes: [
      "Đi quân hợp lý, tránh lỗi cơ bản",
      "Biết 2–3 thế khai cuộc tiêu chuẩn",
      "Hoàn thành ván không blunder quá nhiều",
    ],
    duration: "2–3 tuần",
    deliverable: "Chơi ván hoàn chỉnh, giảm blunder",
  },
  {
    id: "02",
    number: 2,
    name: "Trung cuộc",
    subtitle: "Chiến lược",
    objective: "Kế hoạch, phối hợp quân, kiểm soát trung tâm",
    outcomes: [
      "Nhận diện motif tactics cơ bản",
      "Lập kế hoạch theo cấu trúc tốt",
      "Đọc được thế trận, tìm điểm yếu",
    ],
    duration: "3–4 tuần",
    deliverable: "Tạo lợi thế vị trí, chuyển hóa ưu thế",
  },
  {
    id: "03",
    number: 3,
    name: "Tàn cuộc",
    subtitle: "Kỹ năng tính toán",
    objective: "Tàn cuộc vua–tốt, kỹ thuật cơ bản, tính trước nước",
    outcomes: [
      "Thành thạo kỹ thuật tàn cuộc phổ biến",
      "Tính toán 2–4 nước trước",
      "Quản lý thời gian, không time scramble",
    ],
    duration: "2–3 tuần",
    deliverable: "Không đánh rơi ván thắng ở tàn cuộc",
  },
  {
    id: "04",
    number: 4,
    name: "Thi đấu",
    subtitle: "& Giải",
    objective: "Tâm lý thi đấu, repertoire khai cuộc, review trận",
    outcomes: [
      "Quy trình chuẩn bị, chiến thuật đối thủ",
      "Ghi chép & phân tích ván sau trận",
      "Tâm lý ổn định dưới áp lực",
    ],
    duration: "1–2 tuần*",
    deliverable: "Sẵn sàng tham gia giải",
  },
]

export type RoadmapMetadata = {
  label: string
  icon: string
}

export const roadmapMetadata: RoadmapMetadata[] = [
  { label: "4 Level", icon: "★" },
  { label: "8–12 tuần", icon: "⏱" },
  { label: "Đánh giá mỗi tuần", icon: "✓" },
]

// Teacher Preview Cards
export type TeacherPreview = {
  name: string
  focus: string
  description?: string
}

export const teacherPreviews: TeacherPreview[] = [
  { 
    name: "FM Nguyễn Minh A", 
    focus: "Trẻ em 6–10 tuổi",
    description: "8+ năm kinh nghiệm huấn luyện, tập trung rèn thói quen phân tích trước khi đi, khuyến khích học viên tự tìm lời giải."
  },
  { 
    name: "IM Trần Bảo B", 
    focus: "Thi đấu nâng cao",
    description: "8+ năm kinh nghiệm huấn luyện, tập trung rèn thói quen phân tích trước khi đi, khuyến khích học viên tự tìm lời giải."
  },
  { 
    name: "Coach Lê Thảo C", 
    focus: "Teen & người lớn mới chơi",
    description: "8+ năm kinh nghiệm huấn luyện, tập trung rèn thói quen phân tích trước khi đi, khuyến khích học viên tự tìm lời giải."
  },
]
