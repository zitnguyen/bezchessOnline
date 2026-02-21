const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");
// Lấy thông tin người dùng hiện tại
router.get("/me", protect, userController.getMe);

// Cập nhật thông tin cá nhân
router.put("/me", protect, userController.updateProfile);

// Đổi mật khẩu
router.post("/change-password", protect, userController.changePassword);
// Lấy danh sách giáo viên
router.get("/teachers", userController.getTeachers);

//admin routes
// Tạo người dùng
router.post("/", protect, authorize("admin"), userController.createUser);

// Lấy tất cả người dùng
router.get("/", protect, authorize("admin"), userController.getAllUsers);

// Lấy user theo ID
router.get("/:id", protect, authorize("admin"), userController.getUserById);

// Cập nhật user
router.put("/:id", protect, authorize("admin"), userController.updateUser);

// Xóa user
router.delete("/:id", protect, authorize("admin"), userController.deleteUser);

module.exports = router;
