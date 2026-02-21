const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/authMiddleware");
//tạo order
router.post("/", protect, orderController.createOrder);
//lấy order của user
router.get("/my-orders", protect, orderController.getMyOrders);
//hủy order
router.put("/:id/cancel", protect, orderController.cancelOrder);
//admin lấy tất cả
router.put("/:id/pay", protect, authorize("admin"), orderController.markAsPaid);

module.exports = router;
