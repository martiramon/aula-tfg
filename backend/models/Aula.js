const mongoose = require("mongoose");

const Aula = mongoose.model(
  "Aula",
  new mongoose.Schema({
    nom: String,
    codi: String,
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
    },
    alumnes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumnes",
      },
    ],
  })
);

module.exports = Aula;
