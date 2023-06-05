const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Import Routes.
const authRoutes = require("./routes/authRoute");


// playground Routes
const validatorRoutes = require('./playground/validator') //TODO: should be remove


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
];

app.use(middleware);

app.use("/auth", authRoutes);
app.use('/playground', validatorRoutes); //TODO: should be remove

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
