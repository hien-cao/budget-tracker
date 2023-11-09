const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const { asyncHandler } = require("./index");
const { UnauthorizedError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require("../services/keyToken.service");

const HEADER = {
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization", // access token
  REFRESHTOKEN: "x-rtoken-id", // refresh token
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const storeKeyAndGetTokens = async ({ username, _id: userId }) => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  const tokens = await createTokenPair(
    { username, userId },
    publicKey,
    privateKey
  );
  await KeyTokenService.createKeyToken({
    userId: userId,
    publicKey,
    privateKey,
    refreshToken: tokens.refreshToken,
  });
  return tokens;
};

const checkAuthentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  const refreshToken = req.headers[HEADER.REFRESHTOKEN];

  // verify token
  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) {
    throw new NotFoundError("Not found keys");
  }
  if (refreshToken && req.url.indexOf("handleRefreshToken") > 0) {
    try {
      const decodeUser = await verifyJWT(refreshToken, keyStore.privateKey);
      if (userId !== decodeUser.userId) {
        throw new UnauthorizedError("Invalid user");
      }
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError("Refresh token expired");
      }
      throw error;
    }
  }

  try {
    const decodeUser = await verifyJWT(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new UnauthorizedError("Invalid user");
    }
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError("Access token expired");
    }
    throw error;
  }
});

const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
};

module.exports = {
  createTokenPair,
  storeKeyAndGetTokens,
  checkAuthentication,
  verifyJWT,
  HEADER,
};
