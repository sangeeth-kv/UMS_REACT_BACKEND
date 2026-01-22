const logger = require("../config/logger");
const UserModel = require("../model/userModel");


// async function updateUser(email, field, value) {
//   try {
//     const allowedFields = [
//       "email",
//       "fullname",
//       "phone",
//       "password",
//       "isBlocked",
//       "isDeleted",
//       "isVerified",
//       "avatar",
//       "avatarThumbStatus"
//     ];

//     if (!allowedFields.includes(field)) {
//       throw new Error(`Invalid update field: ${field}`);
//     }

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { email },
//       { $set: { [field]: value } },
//       { new: true }
//     );

//     return updatedUser;

//   } catch (error) {
//     logger.error(`❌ error in updateUser.js : ${error}`);
//     throw error;
//   }
// }

const ALLOWED_FIELDS = [
  "fullname",
  "phone",
  "email",
  "password",
  "isBlocked",
  "isDeleted",
  "isVerified",
  "avatar",
  "avatarThumbStatus",
  "resetPassword"
];

async function updateUser(userId, updates) {
  try {
    const safeUpdates = {};

    for (const key of Object.keys(updates)) {
      if (!ALLOWED_FIELDS.includes(key)) {
        throw new Error(`Invalid update field: ${key}`);
      }
      safeUpdates[key] = updates[key];
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: safeUpdates },
      { new: true }
    );

    return user;

  } catch (error) {
    logger.error(`❌ updateUserById failed: ${error}`);
    throw error;
  }
}

module.exports = updateUser;
