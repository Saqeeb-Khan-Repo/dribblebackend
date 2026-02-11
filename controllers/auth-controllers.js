// controllers/auth.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAuth = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "username already exists , please try another username",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashPassword,
      role: role || "user",
    });
    await newUser.save();

    console.log(newUser);
    return res.status(201).json({
      message: "successfully created new user",
      data: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// login
const loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "user does not exists ,please register first",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "password not matched,try again",
        success: false,
      });
    }

    const accessKey = jwt.sign(
      {
        userID: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: "45m" },
    );

    return res.status(200).json({
      message: "loggined SuccessFully",
      success: true,
      accessKey,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { loginAuth, registerAuth };
