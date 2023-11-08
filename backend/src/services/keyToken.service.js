const keyTokenSchema = require("../models/keyToken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        usedRefreshTokens: [],
        refreshToken,
      };
      const options = {
        new: true,
        upsert: true,
      };
      const tokens = await keyTokenSchema.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenSchema
      .findOne({ user: new Types.ObjectId(userId) })
      .lean();
  };

  static removeKeyById = async (id) => {
    return await keyTokenSchema.deleteOne(id).lean();
  };

  static removeKeyByUserId = async (userId) => {
    return await keyTokenSchema
      .deleteOne({ user: new Types.ObjectId(userId) })
      .lean();
  };

  static findByUsedRefreshToken = async (usedRefreshToken) => {
    return await keyTokenSchema
      .findOne({
        usedRefreshTokens: usedRefreshToken,
      })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenSchema.findOne({ refreshToken }).lean();
  };

  static findByUserIdAndUpdateRefreshToken = async ({
    userId,
    refreshToken,
    usedRefreshToken,
  }) => {
    return await keyTokenSchema.updateOne(
      { user: userId },
      {
        $set: {
          refreshToken: refreshToken,
        },
        $addToSet: {
          usedRefreshTokens: usedRefreshToken, // Since the refreshToken is used one time, add it to usedRefreshTokens
        },
      }
    );
  };
}

module.exports = KeyTokenService;
