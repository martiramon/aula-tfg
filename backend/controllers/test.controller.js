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

exports.novaResposta = (req, res) => {
  const resposta = new Resposta({
    autor: req.body.autor,
    test: req.body.test,
    respostes: req.body.respostes,
  });

  resposta.save((err, test) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Test.findOne({
      _id: req.body.test,
    }).exec((err, test) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!test) {
        return res.status(401).send({ message: "Test Not found." });
      }
      test.respostes.push(resposta);
      test.save();
      Alumne.findOne({
        _id: req.body.autor,
      }).exec((err, alumne) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!test) {
          return res.status(401).send({ message: "Alumne Not found." });
        }
        alumne.resposta = resposta;
        alumne.save();
        res.send({
          id: resposta._id,
          autor: resposta.autor,
          test: resposta.test,
          respostes: resposta.respostes,
        });
      });
    });
  });
};
