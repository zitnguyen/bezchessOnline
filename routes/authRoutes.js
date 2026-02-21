const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

//đăng ký
router.post("/signup", authController.signup);

//đăng nhập
router.post("/signin", authController.signin);

//đăng xuất
router.post("/logout", protect, authController.logout);

//làm mới token
router.post("/refresh", authController.refresh);

//đăng xuất khỏi tất cả thiết bị
router.post("/logout-all", protect, authController.logoutAll);

module.exports = router;
