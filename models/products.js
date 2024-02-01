"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  descriptioin: {
    type: DataTypes.TEXT,
  }
});

module.exports = Product;
