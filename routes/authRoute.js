const router = require("express").Router();

const { body } = require("express-validator");

const User = require("../models/User");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");

const signupValidator = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username Must Be Between 2 to 15 Chars")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username Already Used");
      }
    })
    .trim(),

  body("email")
    .isEmail() //read must
    .withMessage("Please Provide A Valid Email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user ) {
        return Promise.reject("Email Already used");
      }
    })
    .normalizeEmail(),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Your Password Must Be Greater Than 5 chars"),

  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Your Password Must Be Greater Than 5 chars")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword != req.body.password) {
        throw new Error("Password Does Not Match");
      }
      return true;
    }),
];

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.get("/logout", logoutController);

module.exports = router;
