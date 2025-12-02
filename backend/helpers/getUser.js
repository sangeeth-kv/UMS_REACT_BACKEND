const userModel=require("../model/userModel")
const logger=require("../config/logger")

async function getUser(email) {
    const user=await userModel.findOne({email}).lean()
    logger.debug(`user in getUser : ${user?.fullname}`)
    if(!user){
        return {message:"user not found" ,success:false}
    }
    return {user:user,success:true}
}

module.exports=getUser