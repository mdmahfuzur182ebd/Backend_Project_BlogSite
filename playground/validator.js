const router = require("express").Router();
const { check, validationResult } = require("express-validator");

router.get("/validator", (req, res, next) => {

   console.log(req.flash('fail'));
   console.log(req.flash('success'));

  res.render("playground/signup", { title: "validator playground" });
});

router.post(
  "/validator",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username Can not empty")
      .isLength({ max: 15 })
      .withMessage(`Username can not be greater than 15 Character`)
      .trim(),

    check("email")
      .isEmail()
      .withMessage("Please Provide A Valid Email")
      .normalizeEmail(),

    check("password").custom((value) => {
      if (value.length < 5) {
        throw new Error("Password Must be Greater than 5 Character");
      }
      return true;
    }),

    check("confirmPassword").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password Does Not Match");
      }
      return true;
    }),
  ],

  (req, res, next) => {
    let errors = validationResult(req);

    // const formatter = (error) => error.msg;

    // console.log(errors.isEmpty());
    // console.log(errors.array());
    // console.log(errors.mapped());
    // console.log(errors.formatWith(formatter).mapped());
    // console.log(req.body.username, req.body.email);

    // res.render("playground/signup", { title: "validator playground" });
    if(!errors.isEmpty()){
      req.flash('fail', 'There is Some Error')
    }else{
      req.flash('success', 'There is No Error')
    }
    res.redirect('/playground/validator')
  }
);

module.exports = router;
