const express = require("express");
const RoleRouter = express.Router();

const RoleController = require("../controllers/role.controller");

RoleRouter.get("/", RoleController.getAllRoles);
RoleRouter.get("/:id", RoleController.getRoleById);

module.exports = RoleRouter;
