const mongoose = require("mongoose");

const ReadingHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  manga: { type: mongoose.Schema.Types.ObjectId, ref: "Manga", required: true },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  lastReadAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "Reading_History",
  ReadingHistorySchema,
  "Reading_Histories"
);
