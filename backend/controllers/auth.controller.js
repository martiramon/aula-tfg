const config = require("../config/auth.config");
const db = require("../models");
const Professor = db.professor;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const professor = new Professor({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    nom: req.body.nom,
    escola: req.body.escola,
  });

  professor.save((err, professor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  Professor.findOne({
    email: req.body.email,
  }).exec((err, professor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!professor) {
      return res.status(401).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      professor.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: professor.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    var authorities = [];

    res.status(200).send({
      id: professor._id,
      email: professor.email,
      nom: professor.nom,
      escola: professor.escola,
      accessToken: token,
    });
  });
};
