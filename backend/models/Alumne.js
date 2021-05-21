const mongoose = require("mongoose");

const Alumne = mongoose.model(
  "Alumne",
  new mongoose.Schema({
    nom: String,
    aula: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aules",
    },
  })
);

module.exports = Alumne;
