const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

//登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

//登入檢查
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    //使用 passport 認證
    successRedirect: "/", //登入成功會回到跟目錄
    failureRedirect: "/users/login", // 失敗會留在登入頁面
  })(req, res, next);
});

//註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

//註冊檢查
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      //檢查email是否存在
      console.log("User already exists");
      res.render("register", {
        //使用者已經註冊過
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = new User({
        // 如果 email 不存在就新增使用者
        name,
        email,
        password,
      });
      newUser
        .save()
        .then((user) => {
          res.redirect("/"); // 新增完成後導回首頁
        })
        .catch((err) => console.log(err));
    }
  });
});

//登出
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
