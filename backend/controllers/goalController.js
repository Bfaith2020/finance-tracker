const Goal = require("../models/Goal");

exports.getGoals = async (req, res) => {
  const userId = req.user.id;
  const goals = await Goal.find({ userId });
  res.json(goals);
};

exports.addGoal = async (req, res) => {
  const userId = req.user.id;
  const { name, target, current, deadline } = req.body;
  if (!name || !target) return res.status(400).json({ message: "Name and target required" });
  const goal = new Goal({ userId, name, target, current: current || 0, deadline });
  await goal.save();
  res.json(goal);
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, target, current, deadline } = req.body;
  const goal = await Goal.findByIdAndUpdate(id, { name, target, current, deadline }, { new: true });
  res.json(goal);
};

exports.deleteGoal = async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.json({ message: "Goal deleted" });
};
