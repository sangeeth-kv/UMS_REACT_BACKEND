const logger = require("../config/logger");
const UserModel = require("../model/userModel");


async function updateUser(email, field, value) {
  try {
    const allowedFields = [
      "email",
      "fullname",
      "phone",
      "password",
      "isBlocked",
      "isDeleted",
      "isVerified"
    ];

    if (!allowedFields.includes(field)) {
      throw new Error(`Invalid update field: ${field}`);
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { [field]: value } },
      { new: true }
    );

    return updatedUser;
    
  } catch (error) {
    logger.error(`❌ error in updateUser.js : ${error}`);
    throw error;
  }
}

module.exports = updateUser;
