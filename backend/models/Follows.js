const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mangas",
    required: true,
  },
  followedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Follows", FollowSchema, "Follows");
