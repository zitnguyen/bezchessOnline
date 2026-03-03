/**
 * Mock Finance Data
 */

export type KPIData = {
  revenue: number
  operationalCost: number
  netProfit: number
  trends: {
    revenue: number
    cost: number
    profit: number
  }
}

export type TransactionData = {
  id: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  status: "completed" | "pending" | "failed"
}

export const mockFinanceKPIData: KPIData = {
  revenue: 45500000,
  operationalCost: 15200000,
  netProfit: 30300000,
  trends: {
    revenue: 12,
    cost: -8,
    profit: 18,
  },
}

export const mockFinanceChartData = [
  { month: "T1", income: 35000000, expense: 12000000 },
  { month: "T2", income: 42000000, expense: 14500000 },
  { month: "T3", income: 38000000, expense: 13200000 },
  { month: "T4", income: 45500000, expense: 15200000 },
  { month: "T5", income: 41000000, expense: 14000000 },
  { month: "T6", income: 48000000, expense: 16500000 },
]

export const mockTransactions: TransactionData[] = [
  {
    id: "TXN001",
    date: "2024-02-28",
    description: "Thanh toán khóa học Unity Basics",
    amount: 1500000,
    type: "income",
    category: "Khóa học",
    status: "completed",
  },
  {
    id: "TXN002",
    date: "2024-02-27",
    description: "Chi phí máy chủ tháng 2",
    amount: 3200000,
    type: "expense",
    category: "Vận hành",
    status: "completed",
  },
  {
    id: "TXN003",
    date: "2024-02-26",
    description: "Hoàn tiền khóa học hết hạn",
    amount: 500000,
    type: "expense",
    category: "Hoàn tiền",
    status: "pending",
  },
]
