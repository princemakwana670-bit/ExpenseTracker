const {UsersModel} = require("../models/UsersModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await UsersModel.findById(data.id)
      if (!user) return res.status(401).json({ status: false, message: "User not found" });
      req.user = user;
      next();
    }
  })
}