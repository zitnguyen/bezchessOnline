/**
 * Mock Parents Data
 */

export type Parent = {
  id: number
  code: string
  name: string
  avatar?: string
  relationship?: "Father" | "Mother" | "Guardian"
  phone?: string
  email?: string
  address?: string
  students?: string[]
}

export const mockParents: Parent[] = [
  {
    id: 1,
    code: "PH001",
    name: "Nguyễn Thị Hương",
    relationship: "Mother",
    phone: "0901234567",
    email: "hường.nguyễn@email.com",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    students: ["HV001", "HV002"],
  },
  {
    id: 2,
    code: "PH002",
    name: "Trần Văn Minh",
    relationship: "Father",
    phone: "0912345678",
    email: "minhtran@email.com",
    address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
    students: ["HV003"],
  },
  {
    id: 3,
    code: "PH003",
    name: "Lê Thị Tuyết",
    relationship: "Mother",
    phone: undefined,
    email: "tuyet.le.2015@gmail.com",
    address: "789 Đường Đồng Khởi, Quận 1, TP.HCM",
    students: ["HV004"],
  },
  {
    id: 4,
    code: "PH004",
    name: "Phạm Văn Sơn",
    relationship: "Father",
    phone: "0923456789",
    email: undefined,
    address: "321 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM",
    students: ["HV005"],
  },
  {
    id: 5,
    code: "PH005",
    name: "Hoàng Thu Hương",
    relationship: "Guardian",
    phone: "0934567890",
    email: "huonghoang@email.com",
    address: undefined,
    students: ["HV006"],
  },
  {
    id: 6,
    code: "PH006",
    name: "Vũ Thị Lan Phương",
    relationship: "Mother",
    phone: "0945678901",
    email: "lanphuong.vu@email.com",
    address: "654 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
    students: ["HV007", "HV008"],
  },
]
