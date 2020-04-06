//require module and basic setting
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = 3000;

//set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//set method-override
app.use(methodOverride("_method"));

//use express-handlebars to be template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

//export route
app.use("/", require("./routes/home"));
app.use("/todos", require("./routes/todo"));

//listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
