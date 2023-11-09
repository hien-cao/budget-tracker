const userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./keyToken.service");
const {
  storeKeyAndGetTokens,
  verifyJWT,
  createTokenPair,
} = require("../utils/authUtils");
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} = require("../core/error.response");
const { getInfoData } = require("../utils");
const UserService = require("./user.service");

class AccessService {
  static getUser = async (userId) => {
    const user = await UserService.findByUserId(userId);
    return {
      data: getInfoData({
        fields: ["username"],
        object: user,
      }),
    };
  };
  static logOut = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  };

  static logIn = async ({ username, password, refreshToken = null }) => {
    if (!username || !password) {
      throw new BadRequestError("All fields are required");
    }

    const user = await UserService.findByUsername({ username });
    if (!user) {
      throw new BadRequestError("User not registered");
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      throw new UnauthorizedError("Authentication error");
    }

    const tokens = await storeKeyAndGetTokens(user);

    return {
      data: getInfoData({
        fields: ["username"],
        object: user,
      }),
      tokens,
    };
  };

  static signUp = async ({ username, password }) => {
    if (!username || !password) {
      throw new BadRequestError("All fields are required");
    }
    const user = await UserService.findByUsername({ username });
    if (user) {
      throw new BadRequestError("Username already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
      username,
      password: passwordHash,
    });

    if (!newUser) {
      throw new InternalServerError("User cannot be registered");
    }

    const tokens = await storeKeyAndGetTokens(newUser);
    return {
      data: getInfoData({
        fields: ["username"],
        object: newUser,
      }),
      tokens,
    };
  };

  /* This func is to verify of the refresh token is used more than once, then remove all the tokens related to the suspicious user */
  static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, username } = user;
    if (keyStore.usedRefreshTokens.includes(refreshToken)) {
      await KeyTokenService.removeKeyByUserId(userId);
      throw new ForbiddenError("Something wrong happened. Please log in again");
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new UnauthorizedError("User not registered");
    }

    const foundUser = await UserService.findByUsername({ username });
    if (!foundUser) {
      throw new UnauthorizedError("User not registered");
    }

    // issue new token pair
    const tokens = await createTokenPair(
      { username, userId },
      keyStore.publicKey,
      keyStore.privateKey
    );

    // update token
    await KeyTokenService.findByUserIdAndUpdateRefreshToken({
      userId,
      refreshToken: tokens.refreshToken,
      usedRefreshToken: refreshToken,
    });
    return {
      data: getInfoData({
        fields: ["username"],
        object: foundUser,
      }),
      tokens,
    };
  };
}
module.exports = AccessService;
