const jwt = require("jsonwebtoken");

let authMiddleware = (req, res, next) => {
  //   try {
  //     console.log("req.headers");
  //   } catch (error) {}
  try {
    // console.log(req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .send({ status: 0, msg: "Authorization header missing" });
    }

    let token = authHeader.split(" ")[1];
    // console.log(token);
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    // console.log(decoded.id);

    req.userId = decoded.id;

    // console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authMiddleware };
