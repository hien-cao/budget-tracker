const userSchema = require("../models/user.model");
const { Types } = require("mongoose");

class UserService {
  static findByUsername = async ({ username }) => {
    return await userSchema.findOne({ username }).lean();
  };

  static findByUserId = async (userId) => {
    return await userSchema.findOne(new Types.ObjectId(userId)).lean();
  };
}

module.exports = UserService;
