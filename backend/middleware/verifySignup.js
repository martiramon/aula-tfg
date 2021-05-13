const db = require("../models");
const Professor = db.professor;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  Professor.findOne({
    email: req.body.email,
  }).exec((err, professor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (professor) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
