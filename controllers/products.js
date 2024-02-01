const { Product, User } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("cloudinary");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "email"], // Include specific user attributes
      },
    ],
  });
  res.json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username", "email"], // Include specific user attributes
      },
    ],
  });
  res.json(products);
});

exports.postProduct = asyncHandler(async (req, res) => {
  const { name, price, descriptioin } = req.body;
  const product = await Product.create({
    name,
    price,
    descriptioin,
    UserId: req.user.id,
  });
  res.json(product);
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, descriptioin } = req.body;
  const id = req.params.id;
  const UserId = req.user.id;
  const product = await Product.findByPk(id);
  if (UserId != product.UserId) {
    return next(
      new ApiError("You do not have the authority to modify this product", 401)
    );
  }
  product.name = name;
  product.price = price;
  product.descriptioin = descriptioin;
  await product.save();
  res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const UserId = req.user.id;
  const product = await Product.findByPk(id);
  if (UserId != product.UserId) {
    return next(
      new ApiError("You do not have the authority to delete this product", 401)
    );
  }
  product.destroy();
  res.json("product deleted successfully");
});
