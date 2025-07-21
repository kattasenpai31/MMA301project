const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.render("categories/index", { categories });
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

router.get("/new", (req, res) => {
  res.render("categories/new", { title: "Tạo mới thể loại" });
});
router.post("/", async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});
router.get("/:id/edit", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).render("404", { title: "Không tìm thấy" });
    }
    res.render("categories/edit", { category });
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category) {
      return res.status(404).render("404", { title: "Không tìm thấy" });
    }
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).render("404", { title: "Không tìm thấy" });
    }
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

module.exports = router;
