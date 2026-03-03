const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.post("/registration", contactController.createRegistration);
router.get("/registration", protect, contactController.getRegistrations);

router.get("/registration/:id", protect, contactController.getRegistrationById);
router.put("/registration/:id", protect, contactController.updateRegistration);
router.delete(
  "/registration/:id",
  protect,
  contactController.deleteRegistration,
);

router.post(
  "/registration/:id/approve",
  protect,
  contactController.approveRegistration,
);

router.post(
  "/registration/:id/reject",
  protect,
  contactController.rejectRegistration,
);

router.post("/", contactController.createContact);
router.get("/", protect, contactController.getContacts);

router.get("/:id", protect, contactController.getContactById);
router.put("/:id", protect, contactController.updateContact);

router.post("/:id/respond", protect, contactController.respondToContact);

module.exports = router;

