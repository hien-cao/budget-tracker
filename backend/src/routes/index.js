const express = require("express");
const router = express.Router();

router
  .use("/v1/api", require("./transaction.route"))
  .use("/v1/api/user", require("./access.route"));

module.exports = router;
