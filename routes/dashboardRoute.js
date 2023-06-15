const route = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController,
} = require("../controllers/dashboardController");

route.get("/", isAuthenticated, dashboardGetController);

route.get('/create-profile', isAuthenticated, createProfileGetController)
route.post('/create-profile', isAuthenticated, createProfilePostController)

route.get('/edit-profile', isAuthenticated, editProfileGetController)
route.post('/edit-profile', isAuthenticated, editProfilePostController)

module.exports = route;
