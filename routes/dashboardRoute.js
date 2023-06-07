const route = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  dashboardGetController,
} = require("../controllers/dashboardController");

route.get("/", isAuthenticated, dashboardGetController);

module.exports = route;
