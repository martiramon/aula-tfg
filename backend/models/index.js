const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.professor = require("./Professor");

db.aula = require("./Aula");

module.exports = db;
