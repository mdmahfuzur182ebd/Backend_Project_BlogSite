const User = require("../models/User");
const bcrypt = require("bcrypt");
const Flash = require("../utils/Flash");

const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");


exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create A New Account",
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req),
  });
};

exports.signupPostController = async (req, res, next) => {
  //console.log(req.body)
  let { 
    username, 
    email, 
    password, 
    confirmPassword 
  } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
  req.flash('fail', 'Please Check Your Form' )

  if (!errors.isEmpty()) {
    return res.render("pages/auth/signup", {
      title: "Create A New Account",
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
      flashMessage: Flash.getMessage(req),
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

    await user.save(); //user save or store data
    res.flash('success', 'User Created SuccessFully')
    res.redirect("/auth/login");

  } catch (error) {
    console.log(error);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  //console.log(req.session.isLoggedIn, req.session.user);
  res.render("pages/auth/login", {
    title: "Login to Your Account",
    error: {},
    flashMessage: Flash.getMessage(req),

  });
};

exports.loginPostController = async (req, res, next) => {
  let { 
    email, 
    password 
  } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
   req.flash('fail', 'Please Check Your Form')

  if (!errors.isEmpty()) {
    return res.render("pages/auth/login", {
      title: "Login to Your Account",
      error: errors.mapped(),
      flashMessage: Flash.getMessage(req),
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      req.flash('fail', 'Please Provide Valid Credentials ')

      return res.render("pages/auth/login", {
        title: "Login to Your Account",
        error: {},
        flashMessage: Flash.getMessage(req),
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("fail", "Please Provide Valid Credentials ");

      return res.render("pages/auth/login", {
        title: "Login to Your Account",
        error: {},
        flashMessage: Flash.getMessage(req),
      });
    }

    req.session.isLoggedIn = true; //create session
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash('success', 'Successfully Logged In')
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
    req.flash('success', 'Successfully Logged Out')
    return res.redirect("/auth/login");
  });
};
