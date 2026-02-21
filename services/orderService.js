const Order = require("../models/Order");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const AppError = require("../utils/AppError");

//tạo đơn hàng
exports.createOrder = async (userId, items, paymentMethod) => {
  if (!items || items.length === 0) {
    throw new AppError("Order items are required", 400);
  }

  let totalAmount = 0;
  const formattedItems = [];

  for (const item of items) {
    const course = await Course.findById(item.courseId);

    if (!course || !course.isPublished || course.isDeleted) {
      throw new AppError("Course not available", 404);
    }

    // Kiểm tra đã enroll chưa
    const alreadyEnrolled = await Enrollment.findOne({
      userId,
      courseId: course._id,
      status: "active",
    });

    if (alreadyEnrolled) {
      throw new AppError(`Already enrolled in course: ${course.title}`, 409);
    }

    formattedItems.push({
      courseId: course._id,
      price: course.price,
    });

    totalAmount += course.price;
  }

  const order = await Order.create({
    userId,
    items: formattedItems,
    totalAmount,
    paymentMethod,
    status: "pending",
  });

  return order;
};

//đánh dấu đơn hàng đã thanh toán và tạo enrollment
exports.markAsPaid = async (orderId, transactionId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "pending") {
    throw new AppError("Invalid order status", 400);
  }

  order.status = "paid";
  order.transactionId = transactionId;
  order.paidAt = new Date();

  await order.save();

  // Tạo enrollment
  for (const item of order.items) {
    const existingEnrollment = await Enrollment.findOne({
      userId: order.userId,
      courseId: item.courseId,
    });

    if (!existingEnrollment) {
      await Enrollment.create({
        userId: order.userId,
        courseId: item.courseId,
        source: "purchase",
        status: "active",
      });
    }
  }

  return order;
};

//hủy đơn hàng
exports.cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "pending") {
    throw new AppError("Cannot cancel this order", 400);
  }

  order.status = "cancelled";
  await order.save();

  return order;
};

//lấy danh sách đơn hàng của người dùng
exports.getMyOrders = async (userId) => {
  return await Order.find({ userId })
    .populate("items.courseId", "title price thumbnail")
    .sort("-createdAt");
};
