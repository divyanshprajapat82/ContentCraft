let express = require("express");
const { register, login, userView } = require("../controller/authController");
const { authMiddleware } = require("../middleware/addMiddleware");
const {
  contentPublish,
  viewContent,
} = require("../controller/ContentController");

let contentRoute = express.Router();

contentRoute.post("/add", authMiddleware, contentPublish);
contentRoute.get("/view", authMiddleware, viewContent);
// contentRoute.post("/login", login);

module.exports = { contentRoute };
