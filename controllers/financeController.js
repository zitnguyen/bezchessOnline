const financeService = require("../services/financeService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createTransaction = asyncHandler(async (req, res) => {
  const transaction = await financeService.createTransaction(req.body);

  res.status(201).json({
    success: true,
    message: "Transaction recorded successfully",
    data: transaction,
  });
});

exports.getTransactions = asyncHandler(async (req, res) => {
  const { type, category, status, fromDate, toDate } = req.query;
  const filters = {};

  if (type) filters.type = type;
  if (category) filters.category = category;
  if (status) filters.status = status;
  if (fromDate || toDate) {
    filters.date = {};
    if (fromDate) filters.date.$gte = new Date(fromDate);
    if (toDate) filters.date.$lte = new Date(toDate);
  }

  const transactions = await financeService.getTransactions(filters);

  res.status(200).json({
    success: true,
    message: "Transactions retrieved successfully",
    data: transactions,
  });
});

exports.getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await financeService.getTransactionById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Transaction retrieved successfully",
    data: transaction,
  });
});

exports.updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await financeService.updateTransaction(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    data: transaction,
  });
});

exports.deleteTransaction = asyncHandler(async (req, res) => {
  await financeService.deleteTransaction(req.params.id);

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
});

exports.getFinanceKPI = asyncHandler(async (req, res) => {
  const { period = "month" } = req.query;

  const kpi = await financeService.getFinanceKPI(period);

  res.status(200).json({
    success: true,
    message: "Finance KPI retrieved successfully",
    data: kpi,
  });
});

exports.getMonthlyRevenue = asyncHandler(async (req, res) => {
  const monthlyRevenue = await financeService.getMonthlyRevenue();

  res.status(200).json({
    success: true,
    message: "Monthly revenue retrieved successfully",
    data: monthlyRevenue,
  });
});

exports.getDashboard = asyncHandler(async (req, res) => {
  const { period = "month" } = req.query;

  const kpi = await financeService.getFinanceKPI(period);
  const monthlyRevenue = await financeService.getMonthlyRevenue();

  res.status(200).json({
    success: true,
    message: "Dashboard data retrieved successfully",
    data: {
      kpi,
      monthlyRevenue,
    },
  });
});
