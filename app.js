const express = require("express");
const morgan = require("morgan");

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



app.get("/", (req, res) => {
  res.json({
    message: "Hello Programmer",
  });
});


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
