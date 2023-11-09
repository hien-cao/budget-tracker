const express = require("express");
const router = express.Router();

router
  .use("/v1/api/transaction", require("./transaction.route"))
  .use("/v1/api/user", require("./access.route"));

module.exports = router;
