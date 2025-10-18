let express = require("express");
const { authRoute } = require("./authRoute");
const { contentRoute } = require("./contentRoute");

let craftRoute = express.Router();

craftRoute.use("/auth", authRoute);
craftRoute.use("/content", contentRoute);

module.exports = { craftRoute };
