const config = require("../config/auth.config.js");
const db = require("../models");
const Professor = db.professor;
const Aula = db.aula;

var jwt = require("jsonwebtoken");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.professorBoard = (req, res) => {
  res.status(200).send("Professor Content.");
};

exports.professorAules = (req, res) => {
  const decoded = jwt.verify(req.get("x-access-token"), config.secret);
  const userId = decoded.id;

  Professor.findOne({
    _id: userId,
  }).exec((err, professor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!professor) {
      return res.status(401).send({ message: "Professor Not found." });
    }

    res.status(200).send({
      aules: professor.aules,
    });
  });
};

exports.novaAula = (req, res) => {
  const decoded = jwt.verify(req.get("x-access-token"), config.secret);
  const userId = decoded.id;

  const aula = new Aula({
    nom: req.body.nom,
    professor: userId,
  });

  aula.save((err, aula) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Professor.findOne({
      _id: userId,
    }).exec((err, professor) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!professor) {
        return res.status(401).send({ message: "Professor Not found." });
      }
      professor.aules.push(aula);
      professor.save();
      res.send({ message: "Aula was added successfully!" });
    });
  });
};
