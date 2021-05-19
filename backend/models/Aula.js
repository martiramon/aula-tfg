const mongoose = require("mongoose");

const Aula = mongoose.model(
  "Aula",
  new mongoose.Schema({
    nom: String,
    alumnes: Array,
    professor: {
      type: Schema.Types.ObjectId,
      ref: "Professor",
    },
  })
);

module.exports = Aula;
