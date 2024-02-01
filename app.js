const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const sequelize = require("./config/database");
const productsRouter = require("./routes/product");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const ApiError = require("./utils/apiError");
const errorMiddleware = require("./middlewares/errorMiddleware");
const path=require('path')

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
  return next(new ApiError("can't find this page", 404));
});

app.use(errorMiddleware);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server runing on port ${process.env.PORT}...`);
});
