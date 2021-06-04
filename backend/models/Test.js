const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  aula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aula",
  },
  preguntes: [
    {
      text: String,
      positiva: Boolean,
    },
  ],
  respostes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resposta",
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
