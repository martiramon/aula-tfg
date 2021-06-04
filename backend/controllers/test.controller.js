const config = require("../config/auth.config.js");
const db = require("../models");
const Professor = db.professor;
const Aula = db.aula;
const Alumne = db.alumne;
const Test = db.test;
const Resposta = db.resposta;

var jwt = require("jsonwebtoken");

exports.testAula = (req, res) => {
  Aula.findOne({
    _id: req.params.aulaId,
  })
    .populate("test")
    .exec((err, aula) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!aula) {
        return res.status(401).send({ message: "Aula Not found." });
      }

      res.status(200).send({
        test: aula.test,
      });
    });
};

exports.nouTest = (req, res) => {
  const test = new Test({
    aula: req.body.aula,
    preguntes: req.body.preguntes,
  });

  test.save((err, test) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Aula.findOne({
      _id: req.body.aula,
    }).exec((err, aula) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!aula) {
        return res.status(401).send({ message: "Aula Not found." });
      }
      aula.test = test;
      aula.save();
      res.send({
        id: test._id,
        aula: test.aula,
        preguntes: test.preguntes,
      });
    });
  });
};
