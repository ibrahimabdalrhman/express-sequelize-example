const { User } = require("../models");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken')
const ApiError = require('../utils/apiError');

const createToken = (payload) =>
  jwt.sign({ UserId: payload }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  return res.status(201).json({
    msg: "user created successfully",
    user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    res.status(400).json({
      msg: "Incorrect username or password",
    });
  }
  const truePass = await bcrypt.compare(password, user.password);
  if (!truePass) {
    return res.json({
      msg: "incorrect password or username"
    });
  }
  const token=createToken(user.id)
  res.status(200).json({
    msg: " logged in successfully",
    user,
    token,
  });
});

exports.auth = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ApiError("you must login to access this route ", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ApiError("you must login to access this route ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check whether the decoded UserId is stored in the database.
    const currentUser = await User.findByPk(decoded.UserId);
    if (!currentUser) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    next(err);
  }
});