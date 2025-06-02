const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["user", "admin", "editor"],
    required: true,
  },
});

module.exports = mongoose.model("Role", RoleSchema, "Role");
