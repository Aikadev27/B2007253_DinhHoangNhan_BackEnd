const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String },
  phone: { type: Number },
  adress: { type: String },
});

module.exports = mongoose.model("User", User, "user");
