const mongoose = require("mongoose");
const Category = require("./Category");

const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  categories: [{ type: String }],
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Manga", MangaSchema, "Mangas");
