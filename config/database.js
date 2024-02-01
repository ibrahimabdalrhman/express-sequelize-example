const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;