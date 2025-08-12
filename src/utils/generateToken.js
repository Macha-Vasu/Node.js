const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

module.exports = (user) => {
  return jwt.sign({ id: user._id }, process.env.jwt_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};
