const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 },
  deadline: { type: Date },
});

module.exports = mongoose.model("Goal", GoalSchema);
