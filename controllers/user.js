// controllers/userController.js
const {User} = require("../models");
const asyncHandler = require("express-async-handler");

exports.addUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const user = await User.create({ name, username, email, password });
  return res.json(user);
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return res.json(user);
});
