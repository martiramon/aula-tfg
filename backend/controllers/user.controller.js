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
  })
    .populate("aules")
    .exec((err, professor) => {
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

exports.aulaAlumnes = (req, res) => {
  Aula.findOne({
    _id: req.params.aulaId,
  })
    .populate("alumnes")
    .exec((err, aula) => {
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

exports.alumnesCodi = (req, res) => {
  Aula.findOne({
    codi: req.params.aulaCodi,
  })
    .populate("alumnes")
    .exec((err, aula) => {
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
      res.send({
        id: aula._id,
        nom: aula.nom,
        codi: aula.codi,
        professor: aula.professor,
        alumnes: aula.alumnes,
      });
    });
  });
};

exports.nouAlumne = (req, res) => {
  const alumne = new Alumne({
    nom: req.body.nom,
    aula: req.body.aulaId,
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
      res.send({
        id: alumne._id,
        nom: alumne.nom,
        aula: alumne.aula,
      });
    });
  });
};

exports.eliminarAlumne = (req, res) => {
  Alumne.findOneAndDelete({
    _id: req.params.alumneId,
  }).exec((err, alumne) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!alumne) {
      return res.status(401).send({ message: "Alumne Not found." });
    }

    res.status(200).send({ message: "Alumne eliminat" });
  });
};
