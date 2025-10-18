let express = require("express");
const { register, login, userView } = require("../controller/authController");
const { authMiddleware } = require("../middleware/addMiddleware");

let authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/view", authMiddleware, userView);

module.exports = { authRoute };
