const mongoose = require("mongoose");

const respostaSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumne",
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  respostes: Array,
});

module.exports = mongoose.model("Resposta", respostaSchema);
