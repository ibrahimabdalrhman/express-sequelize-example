const Product = require('./products');
const User = require('./user');
const db = require('../config/database');

User.hasMany(Product, { as: "products" });
Product.belongsTo(User);

db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

module.exports = {
  Product,
  User,
};
