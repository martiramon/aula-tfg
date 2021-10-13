const mongoose = require("mongoose");

var Resposta = require("./Resposta");
var Aula = require("./Aula");

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

testSchema.post("findOneAndDelete", (document) => {
  const testId = document._id;
  mongoose
    .model("Aula")
    .find({ alumnes: { $in: [testId] } })
    .then((aules) => {
      Promise.all(
        aules.map((aula) =>
          mongoose
            .model("Aula")
            .findOneAndUpdate(
              aula._id,
              { $pull: { test: testId } },
              { useFindAndModify: false, new: true }
            )
        )
      );
    });
  mongoose
    .model("Resposta")
    .find({ test: { $in: [testId] } })
    .then((respostes) => {
      Promise.all(
        respostes.map((resposta) =>
          mongoose.model("Resposta").findOneAndDelete(resposta._id)
        )
      );
    });
});

module.exports = mongoose.model("Test", testSchema);
