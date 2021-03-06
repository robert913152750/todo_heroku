const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

const { authenticated } = require("../config/auth");

// Todo 首頁
router.get("/", authenticated, (req, res) => {
  Todo.find({ userId: req.user._id }) //只會列出登入使用者的 todo
    .sort({ name: "asc" })
    .lean()
    .exec((err, todos) => {
      // 把 Todo model 所有的資料都抓回來
      if (err) return console.error(err);
      return res.render("index", { todos: todos });
    });
});

module.exports = router;
