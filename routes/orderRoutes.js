const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, orderController.createOrder);

router.get("/my-orders", protect, orderController.getMyOrders);

router.put("/:id/cancel", protect, orderController.cancelOrder);

router.put("/:id/pay", protect, authorize("admin"), orderController.markAsPaid);

module.exports = router;

