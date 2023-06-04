const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {

  res.render("pages/auth/signup", { title: "Create A New Account" });
};

exports.signupPostController = async (req, res, next) => {
  //console.log(req.body)
  let { username, email, password, confirmPassword } = req.body;

  try {
    //hash password
    let hashPassword = await bcrypt.hash(password, 11);

    let user = new User({ //create user
      username,
      email,
      password: hashPassword,
    });

    let createUser = await user.save();  //user save or store data
    console.log("User Created Successfully", createUser);
    res.render("pages/auth/signup", { title: "Crate A New Account" });

  } catch (error) {
    console.log(error);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {

   res.render('pages/auth/login', {title:"Login to Your Account"})

};

exports.loginPostController = (req, res, next) => {
  
};

exports.logoutController = (req, res, next) => {};
