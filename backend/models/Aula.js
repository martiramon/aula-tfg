const mongoose = require("mongoose");
const randToken = require("rand-token");

var Alumne = require("./Alumne");
var Test = require("./Test");
var Professor = require("./Professor");

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
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
});

aulaSchema.post("findOneAndDelete", (document) => {
  const aulaId = document._id;
  Professor.find({ aules: { $in: [aulaId] } }).then((professors) => {
    Promise.all(
      professors.map((professor) =>
        Professor.findOneAndUpdate(
          professor._id,
          { $pull: { aules: aulaId } },
          { new: true }
        )
      )
    );
  });
  Alumne.find({ aula: { $in: [aulaId] } }).then((alumnes) => {
    Promise.all(alumnes.map((alumne) => Alumne.findOneAndDelete(alumne._id)));
  });
  Test.find({ aula: { $in: [aulaId] } }).then((tests) => {
    Promise.all(tests.map((test) => Test.findOneAndDelete(test._id)));
  });
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
