const express = require("express");
const router = express.Router();
const accessController = require("../controllers/access.controller");
const { asyncHandler } = require("../utils");
const { checkAuthentication } = require("../utils/authUtils");

router
  .post("/signup", asyncHandler(accessController.signUp))
  .post("/login", asyncHandler(accessController.logIn))
  .use(checkAuthentication)
  .get("/get-user", asyncHandler(accessController.getUser))
  .post("/logout", asyncHandler(accessController.logOut))
  .post(
    "/handleRefreshToken",
    asyncHandler(accessController.handleRefreshToken)
  );

module.exports = router;
