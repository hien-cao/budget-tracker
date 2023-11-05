const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./transaction.route"));

module.exports = router;
