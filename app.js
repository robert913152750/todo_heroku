//require module and basic setting
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

//connect to mongoDB
mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

//mongoDB connect status
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//require todo module
const Todo = require("./models/todo");

//setting route
app.get("/", (req, res) => {
  res.send("hello world");
});

//listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
