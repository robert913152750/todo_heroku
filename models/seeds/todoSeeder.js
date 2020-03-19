const mongoose = require("mongoose");
const Todo = require("../todo");

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: "name_" + i });
  }
  console.log("done");
});
