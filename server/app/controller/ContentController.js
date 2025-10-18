const { ContentModel } = require("../models/ContentModel");

let contentPublish = async (req, res) => {
  let { title, category, content } = req.body;

  console.log("req.userId =", req.userId);
  let resObj;
  let userId = req.userId;

  if (!userId) {
    return res.status(400).send({ status: 0, msg: "User not authenticated" });
  }

  try {
    let obj = {
      title,
      category,
      content,
      userId,
    };

    let data = await ContentModel.insertOne(obj);

    resObj = {
      status: 1,
      data,
      msg: "Post Added!",
    };
  } catch (error) {
    resObj = {
      status: 0,
      msg: "Error processing request",
      error: error.message,
    };
  }

  res.send(resObj);
};

let viewContent = async (req, res) => {
  let userId = req.userId;
  const data = await ContentModel.find({ userId }).sort({ date: -1 });
  res.send({ status: 1, data, msg: "Contents" });
};

module.exports = { contentPublish, viewContent };
