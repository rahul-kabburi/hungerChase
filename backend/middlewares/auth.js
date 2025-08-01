const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(data.id);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
module.exports = authMiddleware;
