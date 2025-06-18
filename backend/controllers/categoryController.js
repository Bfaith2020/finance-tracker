const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  const userId = req.user.id;
  const categories = await Category.find({ userId });
  res.json(categories);
};

exports.addCategory = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });
  const category = new Category({ userId, name });
  await category.save();
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
