const userModel=require("../model/userModel")
const logger=require("../config/logger")
const setUserDetails = require("./setUserDetails")



async function findAllUsers(page,limit) {
    let skip=(page-1)*limit
    const [users,totalUsers]=await Promise.all([
        userModel.find().skip(skip).limit(limit).lean(),
        userModel.countDocuments()
    ])
    logger.debug(`users got in findAllUsers : ${users.length}`)

    const allUsers=users.map((user)=>setUserDetails(user))
    return {allUsers,totalUsers,totalPages: Math.ceil(totalUsers / limit),currentPage: page}
}

module.exports=findAllUsers