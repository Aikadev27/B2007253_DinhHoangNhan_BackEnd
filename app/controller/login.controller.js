const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.test = (req, res) => {
  res.send({ message: "test login/test" });
};

exports.test2 = (req, res) => {
  res.send({ message: "test login" });
};
