const mongoose = require("mongoose");

var Aula = require("./Aula");
var Resposta = require("./Resposta");

const alumneSchema = new mongoose.Schema({
  nom: String,
  aula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aula",
  },
  resposta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resposta",
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

alumneSchema.post("findOneAndDelete", (document) => {
  const alumneId = document._id;
  Aula.find({ alumnes: { $in: [alumneId] } }).then((aules) => {
    Promise.all(
      aules.map((aula) =>
        Aula.findOneAndUpdate(
          aula._id,
          { $pull: { alumnes: alumneId } },
          { new: true }
        )
      )
    );
  });
  Resposta.find({ autor: { $in: [alumneId] } }).then((respostes) => {
    Promise.all(
      respostes.map((resposta) => Resposta.findOneAndDelete(resposta._id))
    );
  });
});

module.exports = mongoose.model("Alumne", alumneSchema);
