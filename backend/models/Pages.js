const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapters",
    required: true,
  },
  imageUrl: { type: String, required: true },
  pageNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Pages", PageSchema, "Pages");
