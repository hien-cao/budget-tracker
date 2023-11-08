const userSchema = require("../models/user.model");

class UserService {
  static findByUsername = async ({ username }) => {
    return await userSchema.findOne({ username }).lean();
  };
}

module.exports = UserService;
