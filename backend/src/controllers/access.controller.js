const AccessService = require("../services/access.service");
const { Created } = require("../core/success.response");

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new Created({
      message: "Get tokens success",
      metadata: await AccessService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new Created({
      message: "Registered success",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  logIn = async (req, res, next) => {
    new Created({
      message: "Log in success",
      metadata: await AccessService.logIn(req.body),
    }).send(res);
  };

  logOut = async (req, res, next) => {
    new Created({
      message: "Log out success",
      metadata: await AccessService.logOut(req.keyStore),
    }).send(res);
  };
}

module.exports = new AccessController();
