const { model } = require("mongoose");
const userSchema = require("../schemas/UsersSchema");

const User = model("User", userSchema);

module.exports = User;
