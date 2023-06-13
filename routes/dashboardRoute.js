const route = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  dashboardGetController,
} = require("../controllers/dashboardController");

route.get("/", isAuthenticated, dashboardGetController);

route.get('/create-profile')
route.post('/create-profile')

route.get('/edit-profile')
route.post('/edit-profile')

module.exports = route;
