const express = require("express");
const mongoose = require("mongoose");

const port = 8000;
const db = "mongodb://localhost:27017/auladb";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// Connect to MongoDB database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server has started!");
    });
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });
