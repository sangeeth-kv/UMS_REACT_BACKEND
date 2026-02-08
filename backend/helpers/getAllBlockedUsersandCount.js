const { USER_ADMIN_FIELDS } = require("../constants/adminConstants");
const User=require("../model/userModel")

async function getAllBlockedUsers() {
    try {
        
        return User.find({
            "isBlocked.userIsBlocked": true,
            role:"user"
        })
        .select(USER_ADMIN_FIELDS)
        .lean()

    } catch (error) {
        throw new Error(`getAllBlocked failed: ${error.message}`)
    }
}

async function getAllBlockedUsersCount() {
    try {

        return User.countDocuments({    
            "isBlocked.userIsBlocked": true,
            "isDeleted.userIsDeleted": false,
            role:"user"
        });

    } catch (error) {
        throw new Error(`getAllBlocked count failed: ${error.message}`)
    }
}

module.exports={getAllBlockedUsers,getAllBlockedUsersCount}