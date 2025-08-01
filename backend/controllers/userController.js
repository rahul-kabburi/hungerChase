const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const createToken = (id) => {
  const jwtData = {
    id,
  };
  return jwt.sign(jwtData, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please Enter a Valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registeredUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = createToken(registeredUser._id);
    res.json({
      success: true,
      message: "User Registered Successfully",
      token,
    });
  } catch (error) {
    res.json({
      success: true,
      message: "Registration Failed - " + error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesn't Exist.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      message: "User Login Successfull",
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User Login Failed" + error.message,
      token,
    });
  }
};
const userController = {
  registerUser,
  loginUser,
};
module.exports = userController;
