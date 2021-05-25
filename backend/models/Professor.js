const mongoose = require("mongoose");

const Professor = mongoose.model(
  "Professor",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    password: String,
    nom: String,
    escola: String,
    aules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aula",
      },
    ],
  })
);

module.exports = Professor;
