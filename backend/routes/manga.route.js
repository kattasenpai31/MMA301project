const express = require("express");
const MangaRouter = express.Router();

const MangaController = require("../controllers/mangas.controller");

MangaRouter.get("/", MangaController.getAllMangas);
MangaRouter.get("/:id", MangaController.getMangaById);
MangaRouter.post("/", MangaController.createManga);
MangaRouter.put("/:id", MangaController.updateManga);
MangaRouter.delete("/:id", MangaController.deleteManga);

module.exports = MangaRouter;
