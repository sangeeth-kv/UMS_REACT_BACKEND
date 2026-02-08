const { USER_ADMIN_FIELDS } = require("../constants/adminConstants");
const User=require("../model/userModel")

async function getAllUsers() {
    try {
        
        return User.find({
            role:"user"
        })
        .select(USER_ADMIN_FIELDS)
        .lean()

    } catch (error) {
        throw new Error(`getAllUsers failed: ${error.message}`)
    }
}

async function getAllUsersCount() {
    try {

        return User.countDocuments({
            role:"user"
        });

    } catch (error) {
        throw new Error(`getAllUsers count failed: ${error.message}`)
    }
}

module.exports={getAllUsers,getAllUsersCount}