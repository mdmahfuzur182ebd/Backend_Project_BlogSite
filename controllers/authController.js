const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", { title: "Create A New Account" });
};

exports.signupPostController = async (req, res, next) => {
  //console.log(req.body)
  let { username, email, password, confirmPassword } = req.body;

  try {
    let hashPassword = await bcrypt.hash(password, 11);

    let user = new User({
      username,
      email,
      password: hashPassword,
    });
    
    let createUser = await user.save();
    console.log("User Created Successfully", createUser);
    res.render("pages/auth/signup", { title: "Crate A New Account" });

  } catch (error) {
    console.log(error);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {};

exports.loginPostController = (req, res, next) => {};

exports.logoutController = (req, res, next) => {};
