const mongoose = require("mongoose");
const Mangas = require("../models/Mangas");
const User = require("../models/User");
const FollowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manga",
    required: true,
  },
  followedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Follows", FollowSchema, "Follows");
