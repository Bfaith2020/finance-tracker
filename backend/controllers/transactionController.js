const Income = require("../models/Income");
const Expense = require("../models/Expense");

// Get all transactions (income + expense)
exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const income = await Income.find({ userId });
  const expense = await Expense.find({ userId });
  const all = [
    ...income.map(i => ({ ...i.toObject(), type: "income" })),
    ...expense.map(e => ({ ...e.toObject(), type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(all);
};

// Add transaction
exports.addTransaction = async (req, res) => {
  const userId = req.user.id;
  const { type, ...data } = req.body;
  let txn;
  if (type === "income") {
    txn = new Income({ ...data, userId });
  } else {
    txn = new Expense({ ...data, userId });
  }
  await txn.save();
  res.json({ ...txn.toObject(), type });
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  const { type, ...data } = req.body;
  let txn;
  if (type === "income") {
    txn = await Income.findByIdAndUpdate(req.params.id, data, { new: true });
  } else {
    txn = await Expense.findByIdAndUpdate(req.params.id, data, { new: true });
  }
  res.json({ ...txn.toObject(), type });
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  const { type } = req.query;
  if (type === "income") {
    await Income.findByIdAndDelete(req.params.id);
  } else {
    await Expense.findByIdAndDelete(req.params.id);
  }
  res.json({ message: "Transaction deleted" });
};
