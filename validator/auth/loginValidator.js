const { body } = require("express-validator");

module.exports = [
  body("email")
        .not().isEmpty().withMessage("Email Can be Empty"),

  body("password")
         .not().isEmpty().withMessage("Password Can not Be Empty"),
];
