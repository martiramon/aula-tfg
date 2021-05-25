const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.professor = require("./Professor");

db.aula = require("./Aula");

db.alumne = require("./Alumne");

module.exports = db;
