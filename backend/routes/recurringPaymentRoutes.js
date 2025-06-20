const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getRecurringPayments,
  addRecurringPayment,
  deleteRecurringPayment,
  renegotiateRecurringPayment,
} = require("../controllers/recurringPaymentController");

const router = express.Router();

router.get("/", protect, getRecurringPayments);
router.post("/", protect, addRecurringPayment);
router.delete("/:id", protect, deleteRecurringPayment);
router.post("/renegotiate", protect, renegotiateRecurringPayment);

module.exports = router;
