const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  manga: { type: mongoose.Schema.Types.ObjectId, ref: "Mangas" }, // hoặc chapter nếu muốn
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comments", CommentSchema, "Comments");
