const Finance = require("../models/Finance");
const AppError = require("../utils/AppError");

exports.createTransaction = async (data) => {
  return await Finance.create(data);
};

exports.getTransactions = async (filters = {}) => {
  return await Finance.find(filters)
    .populate("orderId", "totalAmount status")
    .populate("userId", "name email")
    .sort({ date: -1 });
};

exports.getTransactionById = async (id) => {
  const transaction = await Finance.findById(id)
    .populate("orderId", "totalAmount status")
    .populate("userId", "name email");
  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }
  return transaction;
};

exports.updateTransaction = async (id, data) => {
  const transaction = await Finance.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }
  return transaction;
};

exports.deleteTransaction = async (id) => {
  const transaction = await Finance.findByIdAndDelete(id);
  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }
  return transaction;
};

// Helper function to calculate trend percentage
const calculateTrend = (previousValue, currentValue) => {
  if (previousValue === 0) {
    return currentValue === 0 ? 0 : 100;
  }
  return Math.round(((currentValue - previousValue) / previousValue) * 100);
};

exports.getFinanceKPI = async (period = "month") => {
  const now = new Date();
  let startDate, previousStartDate, previousEndDate;

  if (period === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    previousStartDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );
    previousEndDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
  } else if (period === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    previousEndDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );
  } else if (period === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
    previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
    previousEndDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59);
  }

  // Current period transactions
  const transactions = await Finance.find({
    date: { $gte: startDate },
  });

  // Previous period transactions for comparison
  const previousTransactions = await Finance.find({
    date: { $gte: previousStartDate, $lte: previousEndDate },
  });

  // Calculate current period
  const revenue = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const cost = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = revenue - cost;

  // Calculate previous period
  const previousRevenue = previousTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const previousCost = previousTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const previousProfit = previousRevenue - previousCost;

  return {
    revenue,
    operationalCost: cost,
    netProfit,
    trends: {
      revenue: calculateTrend(previousRevenue, revenue),
      cost: calculateTrend(previousCost, cost),
      profit: calculateTrend(previousProfit, netProfit),
    },
  };
};

exports.getMonthlyRevenue = async () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const transactions = await Finance.find({
    date: { $gte: startOfYear },
    type: "income",
  });

  const monthlyData = {};
  for (let i = 0; i < 12; i++) {
    const monthKey = `T${i + 1}`;
    monthlyData[monthKey] = 0;
  }

  transactions.forEach((t) => {
    const month = t.date.getMonth() + 1;
    const monthKey = `T${month}`;
    monthlyData[monthKey] += t.amount;
  });

  return monthlyData;
};

exports.getTransactionsByCategory = async (filters = {}) => {
  return await Finance.find(filters).sort({ date: -1 });
};
