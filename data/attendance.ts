/**
 * Mock Attendance Data
 * Strongly typed with @/types
 */

import type { AttendanceRecord } from "@/types"

// Mock attendance records for a specific class/date
export const mockAttendanceRecords: Record<string, AttendanceRecord> = {
  "st-001": {
    studentId: "st-001",
    status: "present",
    note: "",
  },
  "st-002": {
    studentId: "st-002",
    status: "present",
    note: "",
  },
  "st-003": {
    studentId: "st-003",
    status: "absent",
    note: "Sick",
  },
  "st-004": {
    studentId: "st-004",
    status: "present",
    note: "",
  },
  "st-005": {
    studentId: "st-005",
    status: "present",
    note: "",
  },
  "st-006": {
    studentId: "st-006",
    status: "late",
    note: "Traffic",
  },
  "st-007": {
    studentId: "st-007",
    status: "present",
    note: "",
  },
  "st-008": {
    studentId: "st-008",
    status: "excused",
    note: "Doctor appointment",
  },
}
