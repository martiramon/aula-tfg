const mongoose = require("mongoose");
const randToken = require("rand-token");

const aulaSchema = new mongoose.Schema({
  nom: String,
  codi: {
    type: String,
    unique: true,
    default: function () {
      return randToken.generate(5);
    },
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
  },
  alumnes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumne",
    },
  ],
});

aulaSchema.index(
  {
    professor: 1,
    nom: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Aula", aulaSchema);
