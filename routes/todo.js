const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

const { authenticated } = require("../config/auth");

//set /todos route
// 列出全部 Todo
router.get("/", authenticated, (req, res) => {
  return res.redirect("/");
});
// 新增一筆 Todo 頁面
router.get("/new", authenticated, (req, res) => {
  return res.render("new");
});
// 顯示一筆 Todo 的詳細內容
router.get("/:id", authenticated, (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err);
      return res.render("detail", { todo: todo });
    });
});
// 新增一筆  Todo
router.post("/", authenticated, (req, res) => {
  // 建立 Todo model 實例
  const todo = new Todo({
    name: req.body.name, //name是從new頁面form過來
  });
  //存入資料庫
  todo.save((err) => {
    if (err) return console.error(err);
    return res.redirect("/"); // 新增完成後，將使用者導回首頁
  });
});
// 修改 Todo 頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err);
      return res.render("edit", { todo: todo });
    });
});
// 修改 Todo
router.put("/:id", authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.name = req.body.name;
    if (req.body.done === "on") {
      todo.done = true;
    } else {
      todo.done = false;
    }
    todo.save((err) => {
      if (err) return console.error(err);
      return res.redirect(`/todos/${req.params.id}`);
    });
  });
});
//刪除功能
router.delete("/:id/delete", authenticated, (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.remove((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
