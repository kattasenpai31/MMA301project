const mongoose = require("mongoose");
const Category = require("./Category");
const Comments = require("./Comments");
const Chapters = require("./Chapters");
const MangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapters" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Manga", MangaSchema, "Mangas");
