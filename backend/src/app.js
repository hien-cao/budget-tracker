const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middleware
app.use(morgan("dev")); // logging
app.use(helmet()); // protect HTTP headers
app.use(compression()); // compress response bodies
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./db/init.mongodb");

// init routers
app.use("/", require("./routes"));

// handle error
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
