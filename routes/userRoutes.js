const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/me", protect, userController.getMe);
router.put("/me", protect, userController.updateProfile);
router.post("/change-password", protect, userController.changePassword);
router.get("/teachers", userController.getTeachers);
router.post("/", protect, authorize("admin"), userController.createUser);

router.get("/", protect, authorize("admin"), userController.getAllUsers);
router.get("/:id", protect, authorize("admin"), userController.getUserById);

router.put("/:id", protect, authorize("admin"), userController.updateUser);

router.delete("/:id", protect, authorize("admin"), userController.deleteUser);

module.exports = router;
