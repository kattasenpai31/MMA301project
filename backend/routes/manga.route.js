const express = require("express");
const MangaRouter = express.Router();

const MangaController = require("../controllers/mangas.controller");

MangaRouter.get("/category/:id", MangaController.getMangasByCategory);
MangaRouter.get("/:id", MangaController.getMangaById);
MangaRouter.put("/:id", MangaController.updateManga);
MangaRouter.delete("/:id", MangaController.deleteManga);
MangaRouter.get("/", MangaController.getAllMangas);
MangaRouter.post("/", MangaController.createManga);

module.exports = MangaRouter;
