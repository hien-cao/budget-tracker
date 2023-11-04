const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middleware
app.use(morgan("dev")); // logging
app.use(helmet()) // protect HTTP headers
app.use(compression()) // compress response bodies
// init db
require("./db/init.mongodb")
// init routers
app.use("/", require("./routes"))

// handling error

module.exports = app;
