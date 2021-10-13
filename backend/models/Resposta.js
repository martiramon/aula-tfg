const mongoose = require("mongoose");

var Alumne = require("./Alumne");
var Test = require("./Test");

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

respostaSchema.post("findOneAndDelete", (document) => {
  const respostaId = document._id;
  mongoose
    .model("Alumne")
    .find({ resposta: { $in: [respostaId] } })
    .then((alumnes) => {
      Promise.all(
        alumnes.map((alumne) =>
          mongoose
            .model("Alumne")
            .findOneAndUpdate(
              alumne._id,
              { $pull: { resposta: respostaId } },
              { useFindAndModify: false, new: true }
            )
        )
      );
    });
  mongoose
    .model("Test")
    .find({ respostes: { $in: [respostaId] } })
    .then((tests) => {
      Promise.all(
        tests.map((test) =>
          mongoose
            .model("Test")
            .findOneAndUpdate(
              test._id,
              { $pull: { respostes: respostaId } },
              { useFindAndModify: false, new: true }
            )
        )
      );
    });
});

module.exports = mongoose.model("Resposta", respostaSchema);
