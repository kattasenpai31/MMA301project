const mongoose = require("mongoose");
const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body; // Sửa thành name thay vì Categoryname

    // Kiểm tra dữ liệu đầu vào
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = new Category({ name }); // Sửa tại đây
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body; // Sửa thành name thay vì Categoryname

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name }, // Sửa tại đây
      { new: true, runValidators: true } // Thêm runValidators để kiểm tra dữ liệu
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
