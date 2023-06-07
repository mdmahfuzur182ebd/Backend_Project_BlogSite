const route = require("express").Router();

const {
  dashboardGetController,
} = require("../controllers/dashboardController");

route.get("/", dashboardGetController);

module.exports = route;
