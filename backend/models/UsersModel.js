const {model} = require("mongoose");
const { userSchema } = require("../schemas/UsersSchema");

module.exports.UsersModel = model("user", userSchema);