//require module and basic setting
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const port = 3000;

//判別開發環境
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//set method-override
app.use(methodOverride("_method"));

//use express-handlebars to be template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set express-session
app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
  })
);

//use flash
app.use(flash());

//use passport
app.use(passport.initialize());
app.use(passport.session());

//load passport config
require("./config/passport")(passport);

//登入後可以取得使用者資訊方便我們在view裡使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated(); // 辨識使用者是否已經登入的變數，讓 view 可以使用
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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

//load route
app.use("/", require("./routes/home"));
app.use("/todos", require("./routes/todo"));
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));

//listen
app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
});
