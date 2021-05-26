const mongoose = require("mongoose");

const alumneSchema = new mongoose.Schema({
  nom: String,
  aula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aules",
  },
});

alumneSchema.index(
  {
    aula: 1,
    nom: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Alumne", alumneSchema);
