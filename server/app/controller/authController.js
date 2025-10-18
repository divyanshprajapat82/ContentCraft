const jwt = require("jsonwebtoken");
const { AuthModel } = require("../models/AuthModel");
let bcrypt = require("bcrypt");

let register = async (req, res) => {
  // console.log(req.body);
  let { name, email, password } = req.body;

  let resObj;

  let user = await AuthModel.findOne({ email });

  // console.log(token);

  if (!user) {
    try {
      let hashPassword = await bcrypt.hash(password, 10);

      let obj = {
        name,
        email,
        password: hashPassword,
      };

      let data = await AuthModel.insertOne(obj);

      resObj = {
        status: 1,
        data,
        msg: "User Registerd!",
      };
    } catch (error) {
      resObj = {
        status: 0,
        msg: "Error processing request",
        error: error.message,
      };
    }
  } else {
    resObj = {
      status: 0,
      msg: "Email is aleardy exist",
    };
  }

  res.send(resObj);
  // console.log(resObj);
};

let login = async (req, res) => {
  let { email, password } = req.body;

  let resObj;

  if (!email || !password) {
    return res.send({
      status: 0,
      msg: "Email and password are required",
    });
  }

  try {
    // Find user by email
    let user = await AuthModel.findOne({ email });

    // If no user found
    if (!user) {
      return res.send({
        status: 0,
        msg: "Invalid Email or Password",
      });
    }

    // Compare password

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign({ id: user._id }, process.env.TOKENKEY);
      resObj = {
        status: 1,
        msg: "Logged In!",
        token,
        // user: {
        //   id: findEmail._id,
        //   email: findEmail.email,
        //   name: findEmail.name,
        // },
      };
    } else {
      resObj = {
        status: 0,
        msg: "Invalid Email or Password",
      };
    }
  } catch (error) {
    resObj = {
      status: 0,
      msg: "Error processing request",
      error: error.message,
    };
  }

  res.send(resObj);
};

let userView = async (req, res) => {
  let userId = req.userId;
  const data = await AuthModel.findById(userId).select("-password");
  res.send({ status: 1, data, msg: "Users" });
};

module.exports = { register, login, userView };
