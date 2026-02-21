const orderService = require("../services/orderService");
const asyncHandler = require("../middleware/asyncHandler");

//tạo đơn hàng
exports.createOrder = asyncHandler(async (req, res) => {
  const { items, paymentMethod } = req.body;

  const order = await orderService.createOrder(
    req.user.id,
    items,
    paymentMethod,
  );

  res.status(201).json({
    success: true,
    data: order,
  });
});
//đánh dấu đơn hàng đã thanh toán
exports.markAsPaid = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;

  const order = await orderService.markAsPaid(req.params.id, transactionId);

  res.status(200).json({
    success: true,
    message: "Đơn hàng đã được đánh dấu là đã thanh toán",
    data: order,
  });
});
//hủy đơn hàng
exports.cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "hủy đơn hàng thành công",
    data: order,
  });
});
//lấy đơn hàng của người dùng
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});
