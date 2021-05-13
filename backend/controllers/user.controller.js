exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.professorBoard = (req, res) => {
  res.status(200).send("Professor Content.");
};
