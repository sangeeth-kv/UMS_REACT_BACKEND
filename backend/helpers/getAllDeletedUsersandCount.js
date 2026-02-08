const { USER_ADMIN_FIELDS } = require("../constants/adminConstants");
const User=require("../model/userModel")

async function getAllDeletedUsers() {
    try {
        
        return User.find({
            "isDeleted.userIsDeleted":true,
            role:"user"
        })
        .select(USER_ADMIN_FIELDS)
        .lean()

    } catch (error) {
        throw new Error(`getAllDeleted failed: ${error.message}`)
    }
}

async function getAllDeletedUsersCount() {
    try {

        return User.countDocuments({
            "isDeleted.userIsDeleted":true,
            role:"user"
        });

    } catch (error) {
        throw new Error(`getAllDeleted count failed: ${error.message}`)
    }
}

module.exports={getAllDeletedUsers,getAllDeletedUsersCount}