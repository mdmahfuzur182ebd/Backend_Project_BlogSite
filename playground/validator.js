const router = require("express").Router();

const { check } = require("express-validator");

router.get("/validator", (req, res, next) => {
  
  res.render("playground/signup", { title: "validator playground" });
});

router.post("/validator", [check("username")], (req, res, next) => {});

module.exports = router;
