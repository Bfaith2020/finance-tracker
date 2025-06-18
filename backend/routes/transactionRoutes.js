const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
