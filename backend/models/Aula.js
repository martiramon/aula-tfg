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
  const testId = document.test;
  mongoose
    .model("Alumne")
    .find({ aula: { $in: [aulaId] } })
    .then((alumnes) => {
      Promise.all(
        alumnes.map((alumne) =>
          mongoose.model("Alumne").findOneAndDelete(alumne._id)
        )
      );
    });
  mongoose
    .model("Test")
    .findOneAndDelete({ _id: " 61729b584be986a6d55c898d " });
  mongoose
    .model("Professor")
    .find({ aules: { $in: [aulaId] } })
    .then((professors) => {
      Promise.all(
        professors.map((professor) =>
          mongoose
            .model("Professor")
            .findOneAndUpdate(
              professor._id,
              { $pull: { aules: aulaId } },
              { useFindAndModify: false, new: true }
            )
        )
      );
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
