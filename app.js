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

// Todo 首頁
app.get("/", (req, res) => {
  res.send("hello world!");
});
// 列出全部 Todo
app.get("/todos", (req, res) => {
  res.send("列出所有 Todo");
});
// 新增一筆 Todo 頁面
app.get("/todos/new", (req, res) => {
  res.send("新增 Todo 頁面");
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  res.send("顯示 Todo 的詳細內容");
});
// 新增一筆  Todo
app.post("/todos", (req, res) => {
  res.send("建立 Todo");
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
