const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//for registeration
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
  // console.log(`hashed is ${hashed}`);
  //res.json({ msg: "register" });
  const user = await User.create({ username, useremail, password: hashed });
  console.log(user);
  if (user) {
    //user display kerava mate
    res
      .status(201)
      .json({ _id: user.id, name: user.username, email: user.useremail });
  } else {
    res.status(400);
    throw new Error("something went wrong");
  }
});
//_________________________________________________________________________________________________________________;

//For Login
const loginUser = asyncHandler(async (req, res) => {
  const { useremail, password } = req.body;
  if (!useremail || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({ useremail });
  if (user && (await bcrypt.compare(password, user.password))) {
    // res.json({ msg: "login" });
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          useremail: user.useremail,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const current = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, current };
