const mongoose = require("mongoose");
const Follow = require("../models/Follows");
const User = require("../models/User");

const followManga = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const existing = await Follow.findOne({ user: req.userId, manga: mangaId });
    if (existing) return res.status(400).json({ message: "Đã theo dõi" });

    const follow = new Follow({ user: req.userId, manga: mangaId });
    await follow.save();
    res.status(201).json(follow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllMangaFollows = async (req, res) => {
  try {
    const follows = await Follow.find({ user: req.userId }).populate({
      path: "manga",
      populate: { path: "categories", select: "name" },
    });

    res.json(follows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unfollowManga = async (req, res) => {
  try {
    const { mangaId } = req.body;
    const follow = await Follow.findOneAndDelete({
      user: req.userId,
      manga: mangaId,
    });
    if (!follow)
      return res.status(404).json({ message: "Theo dõi không tồn tại" });
    res.json(follow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const CheckFollowed = async (req, res) => {
  try {
    const follow = await Follow.findOne({
      user: req.userId,
      manga: req.params.mangaId,
    });

    res.json({ followed: !!follow });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi kiểm tra theo dõi" });
  }
};
module.exports = {
  followManga,
  getAllMangaFollows,
  unfollowManga,
  CheckFollowed,
};
