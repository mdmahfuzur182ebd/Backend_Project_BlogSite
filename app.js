const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

// Import Routes.
const authRoutes = require("./routes/authRoute");

const app = express();

//Setup view Engine

app.set("view engine", "ejs");
app.set("views", "views");

// Middleware Array

const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
     secret: process.env.SECRET_KEY || 'SECRET_KEY', //hashing algo
     resave: false,
     saveUninitialized:false,
    //  cookie:{
    //    maxAge: 60 * 60 * 2 
    //  }
  })
];

app.use(middleware);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello Project.",
  });
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://mdmahfuzur7788:12345@cluster0.zlpqkbc.mongodb.net/exp-blog",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((e) => {
    return console.log(e);
  });
