const userModel=require("../model/userModel")
const logger=require("../config/logger")
const setUserDetails = require("./setUserDetails")



async function findAllUsers() {
    let allUsers=[]
    const users=await userModel.find().lean()
    logger.debug(`users got in findAllUsers : ${users}`)
    for(let user of users){
        allUsers.push(setUserDetails(user))
    }
    return allUsers
}

module.exports=findAllUsers