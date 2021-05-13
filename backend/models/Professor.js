const mongoose = require("mongoose");

const Professor = mongoose.model(
  "Professor",
  new mongoose.Schema({
    email: String,
    password: String,
    nom: String,
    escola: String,
  })
);

module.exports = Professor;
