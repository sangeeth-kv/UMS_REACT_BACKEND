const { USER_ADMIN_FIELDS } = require("../constants/adminConstants");
const User=require("../model/userModel")

async function getAllActiveUsers() {
    try {
        
        return User.find({
            "isDeleted.userIsDeleted":false,
            "isBlocked.userIsBlocked": false,
            role:"user"
        })
        .select(USER_ADMIN_FIELDS)
        .lean()

    } catch (error) {
        throw new Error(`getAllActiveUsers failed: ${error.message}`)
    }
}

async function getAllActiveUsersCount() {
    try {

        return User.countDocuments({
            "isDeleted.userIsDeleted":false,
            "isBlocked.userIsBlocked": false,
            role:"user"
        });

    } catch (error) {
        throw new Error(`getAllActiveUsers count failed: ${error.message}`)
    }
}

module.exports={getAllActiveUsers,getAllActiveUsersCount}