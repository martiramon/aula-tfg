const config = require("../config/auth.config.js");
const db = require("../models");
const Professor = db.professor;
const Aula = db.aula;
const Alumne = db.alumne;

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

exports.professorAules = (req, res) => {
  const decoded = jwt.verify(req.get("x-access-token"), config.secret);
  const userId = decoded.id;

  Aula.findOne({
    nom: req.body.nom,
    professor: userId,
  }).exec((err, aula) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!aula) {
      return res.status(401).send({ message: "Aula Not found." });
    }

    res.status(200).send({
      _id: aula._id,
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

exports.aulaAlumnes = (req, res) => {
  const decoded = jwt.verify(req.get("x-access-token"), config.secret);
  const userId = decoded.id;

  Aula.findOne({
    professor: userId,
    nom: req.body.nom,
  }).exec((err, aula) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!aula) {
      return res.status(401).send({ message: "Aula Not found." });
    }

    res.status(200).send({
      alumnes: aula.alumnes,
    });
  });
};

exports.nouAlumne = (req, res) => {
  const decoded = jwt.verify(req.get("x-access-token"), config.secret);
  const userId = decoded.id;

  const alumne = new Alumne({
    nom: req.body.nom,
    aula: aulaId,
  });

  alumne.save((err, alumne) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Aula.findOne({
      _id: req.body.aulaId,
    }).exec((err, aula) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!aula) {
        return res.status(401).send({ message: "Aula Not found." });
      }
      aula.alumnes.push(alumne);
      aula.save();
      res.send({ message: "Alumne was added successfully!" });
    });
  });
};
