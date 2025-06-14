const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  loginName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  phoneNumber: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema, "User");
