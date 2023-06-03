const express = require("express");
const morgan = require("morgan");
//const bodyParser = require("body-parser");

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
//app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.render('pages/auth/signup', {title:'Create A New Account '})
  //res.render("pages/index");
});

app.get('/login',(req, res) =>{
  
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

