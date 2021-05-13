const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: String,
  content: String,
});

module.exports = mongoose.model("Professor", schema);
