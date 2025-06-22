const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mangas",
    required: true,
  },
  title: { type: String, required: true },
  chapterNumber: { type: Number, required: true },

  pages: [
    {
      path: { type: String, required: true },
      order: { type: Number, required: true },
    },
  ],
  viewCount: { type: Number, default: 0 },
  releaseDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chapters", ChapterSchema, "Chapters");
