const mongoose = require("mongoose");

const Aula = mongoose.model(
  "Aula",
  new mongoose.Schema({
    nom: String,
    alumnes: Array,
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
  })
);

module.exports = Aula;
