const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { username, useremail, password } = req.body;
  if (!username || !useremail || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const useravail = await User.findOne({ useremail });
  if (useravail) {
    res.status(400);
    throw new Error("useralready register");
  }

  //hash password
  const hashed = await bcrypt.hash(password, 10);
  console.log(`hashed is ${hashed}`);
  res.json({ msg: "register" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ msg: "login" });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ msg: "user" });
});

module.exports = { registerUser, loginUser, currentUser };
