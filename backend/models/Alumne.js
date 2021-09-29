const mongoose = require("mongoose");

const Aula = require("./Aula");
const Resposta = require("./Resposta");

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
  mongoose
    .model("Resposta")
    .find({ autor: { $in: [alumneId] } })
    .then((respostes) => {
      Promise.all(
        respostes.map((resposta) =>
          mongoose.model("Resposta").findOneAndDelete(resposta._id)
        )
      );
    });
  mongoose
    .model("Aula")
    .find({ alumnes: { $in: [alumneId] } })
    .then((aules) => {
      Promise.all(
        aules.map((aula) =>
          mongoose
            .model("Aula")
            .findOneAndUpdate(
              aula._id,
              { $pull: { alumnes: alumneId } },
              { useFindAndModify: false, new: true }
            )
        )
      );
    });
});

module.exports = mongoose.model("Alumne", alumneSchema);
