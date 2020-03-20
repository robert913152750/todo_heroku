//require module and basic setting
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;

//set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

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

// Todo 首頁
app.get("/", (req, res) => {
  Todo.find()
    .lean()
    .exec((err, todos) => {
      // 把 Todo model 所有的資料都抓回來
      if (err) return console.error(err);
      return res.render("index", { todos: todos });
    });
});
// 列出全部 Todo
app.get("/todos", (req, res) => {
  return res.redirect("/");
});
// 新增一筆 Todo 頁面
app.get("/todos/new", (req, res) => {
  return res.render("new");
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  res.send("顯示 Todo 的詳細內容");
});
// 新增一筆  Todo
app.post("/todos", (req, res) => {
  // 建立 Todo model 實例
  const todo = new Todo({
    name: req.body.name //name是從new頁面form過來
  });
  //存入資料庫
  todo.save(err => {
    if (err) return console.error(err);
    return res.redirect("/"); // 新增完成後，將使用者導回首頁
  });
});
// 修改 Todo 頁面
app.get("/todos/:id/edit", (req, res) => {
  res.send("修改 Todo 頁面");
});
// 修改 Todo
app.post("/todos/:id/edit", (req, res) => {
  res.send("修改 Todo");
});
//listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
