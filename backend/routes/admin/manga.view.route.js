const express = require("express");
const router = express.Router();
const Manga = require("../../models/Mangas");
const Category = require("../../models/Category");
// Danh sách manga
router.get("/", async (req, res) => {
  try {
    const mangas = await Manga.find().populate("categories", "name");
    res.render("mangas/index", { mangas });
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Trang tạo mới
router.get("/new", async (req, res) => {
  try {
    const categories = await Category.find().select("name");
    res.render("mangas/new", { categories });
  } catch (error) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Tạo mới manga
router.post("/", async (req, res) => {
  try {
    const manga = new Manga({
      ...req.body,
      categories: Array.isArray(req.body.categories)
        ? req.body.categories
        : [req.body.categories],
    });
    await manga.save();
    res.redirect("/mangas");
  } catch (err) {
    console.error(err);
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Trang chi tiết
router.get("/:id", async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id).populate(
      "categories",
      "name"
    );
    if (!manga)
      return res.status(404).render("404", { title: "Không tìm thấy" });
    res.render("mangas/show", { manga });
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Trang sửa
router.get("/:id/edit", async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id).populate(
      "categories",
      "name"
    );
    const categories = await Category.find().select("name");
    if (!manga)
      return res.status(404).render("404", { title: "Không tìm thấy" });
    res.render("mangas/edit", { manga, categories });
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Cập nhật manga
router.put("/:id", async (req, res) => {
  try {
    await Manga.findByIdAndUpdate(req.params.id, {
      ...req.body,
      categories: Array.isArray(req.body.categories)
        ? req.body.categories
        : [req.body.categories],
    });
    res.redirect("/mangas");
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

// Xoá manga
router.delete("/:id", async (req, res) => {
  try {
    await Manga.findByIdAndDelete(req.params.id);
    res.redirect("/mangas");
  } catch (err) {
    res.status(500).render("500", { title: "Lỗi Server" });
  }
});

module.exports = router;
