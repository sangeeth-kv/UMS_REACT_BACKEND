const { getAllActiveUsersCount, getAllActiveUsers } = require("./getActiveUserandCount")
const { getAllBlockedUsersCount, getAllBlockedUsers } = require("./getAllBlockedUsersandCount")
const { getAllDeletedUsersCount, getAllDeletedUsers } = require("./getAllDeletedUsersandCount")
const { getAllUsersCount } = require("./getAllusersandCount")

async function getAllCounts() {
    try {
        const [totalUsersCount,activeUsersCount,deletedUsersCount,blockedUsersCount]=await Promise.all([
                getAllUsersCount(),
                getAllActiveUsersCount(),
                getAllDeletedUsersCount(),
                getAllBlockedUsersCount()
            ])

            return {totalUsersCount,activeUsersCount,deletedUsersCount,blockedUsersCount}
    } catch (error) {
        throw new Error(`getAllTypeUsers count failed: ${error.message}`)
    }
}

async function getAllTypeUsersList() {
    try {
        const [activeUsers,deletedUsers,blockedUsers]=await Promise.all([
            getAllActiveUsers(),
            getAllDeletedUsers(),
            getAllBlockedUsers()
        ])

        return {activeUsers,deletedUsers,blockedUsers}

    } catch (error) {
        throw new Error(`getAllTypeUsers failed: ${error.message}`)
    }
}

module.exports={getAllCounts,getAllTypeUsersList}