const mongoose = require("mongoose");

const Manga = require("../models/Mangas");

const getAllMangas = async (req, res) => {
  try {
    const mangas = await Manga.find().populate("categories", "name");
    res.json(mangas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createManga = async (req, res) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json(manga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateManga = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteManga = async (req, res) => {
  try {
    const manga = await Manga.findByIdAndDelete(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json({ message: "Manga deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMangasByCategory = async (req, res) => {
  try {
    const categoryName = req.params.id;
    const mangas = await Manga.find({ categories: categoryName });
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga,
  getMangasByCategory,
};
