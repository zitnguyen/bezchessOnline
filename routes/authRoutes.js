const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.post("/logout", protect, authController.logout);

router.post("/refresh", authController.refresh);

router.post("/logout-all", protect, authController.logoutAll);

module.exports = router;

