const User = require("../models/User");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

const errorFormatter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create A New Account",
    error: {},
    value: {},
  });
};

exports.signupPostController = async (req, res, next) => {
  //console.log(req.body)
  let { username, email, password, confirmPassword } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    //return console.log(errors.mapped());
    return res.render("pages/auth/signup", {
      title: "Create A New Account",
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
    });
  }

  try {
    //hash password
    let hashPassword = await bcrypt.hash(password, 11);

    //create user
    let user = new User({
      username,
      email,
      password: hashPassword,
    });

    let createUser = await user.save(); //user save or store data
    console.log("User Created Successfully", createUser);
    res.render("pages/auth/signup", { title: "Crate A New Account" });
  } catch (error) {
    console.log(error);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  console.log(req.session.isLoggedIn, req.session.user);

  res.render("pages/auth/login", {
    title: "Login to Your Account",
    error: {},
  });
};

exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render("pages/auth/login", {
      title: "Login to Your Account",
      error: errors.mapped(),
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid Credential",
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid Credential",
      });
    }

    req.session.isLoggedIn = true; //create session
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect("/dashboard");
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.logoutController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect("/auth/login");
  });
};
