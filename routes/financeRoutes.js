const express = require("express");
const router = express.Router();
const financeController = require("../controllers/financeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/transactions", protect, financeController.createTransaction);
router.get("/transactions", protect, financeController.getTransactions);

router.get("/transactions/:id", protect, financeController.getTransactionById);
router.put("/transactions/:id", protect, financeController.updateTransaction);
router.delete(
  "/transactions/:id",
  protect,
  financeController.deleteTransaction,
);

router.get("/kpi", protect, financeController.getFinanceKPI);

router.get("/revenue/monthly", protect, financeController.getMonthlyRevenue);

router.get("/dashboard", protect, financeController.getDashboard);

module.exports = router;

