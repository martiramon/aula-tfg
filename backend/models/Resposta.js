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
  Alumne.find({ resposta: { $in: [respostaId] } }).then((alumnes) => {
    Promise.all(
      alumnes.map((alumne) =>
        Alumne.findOneAndUpdate(
          alumne._id,
          { $pull: { resposta: respostaId } },
          { new: true }
        )
      )
    );
  });
  Test.find({ respostes: { $in: [respostaId] } }).then((tests) => {
    Promise.all(
      tests.map((test) =>
        Test.findOneAndUpdate(
          test._id,
          { $pull: { respostes: respostaId } },
          { new: true }
        )
      )
    );
  });
});

module.exports = mongoose.model("Resposta", respostaSchema);
