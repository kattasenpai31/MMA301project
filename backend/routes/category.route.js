const express = require("express");
const CategoryRouter = express.Router();

const CategoryController = require("../controllers/category.controller");

CategoryRouter.get("/", CategoryController.getAllCategories);
CategoryRouter.get("/:id", CategoryController.getCategoryById);
CategoryRouter.post("/", CategoryController.createCategory);
CategoryRouter.put("/:id", CategoryController.updateCategory);
CategoryRouter.delete("/:id", CategoryController.deleteCategory);

module.exports = CategoryRouter;
