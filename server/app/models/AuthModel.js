const mongoose = require("mongoose");

let authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 80,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let AuthModel = mongoose.model("User", authSchema);
module.exports = { AuthModel };
