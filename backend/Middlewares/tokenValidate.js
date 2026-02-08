const logger=require("../config/logger")
const failedResponse=require("../helpers/responses/failerResponse")
const STATUS_CODES=require("../utils/statusCodes")
const User=require("../model/userModel")
const { getHashed } = require("../helpers/getHashed")


async function tokenValidate(req,res,next) {
    try { 
        console.log("req in middleware : ",req)
        const {token}=req.params

        if(!token){
            return failedResponse(STATUS_CODES.BAD_REQUEST,[],"NOT AUTHORISED",res)
        }

        logger.debug("After token validation")

        const hashedToken=getHashed(token)


        console.log("hashed token : ",hashedToken)

        logger.debug("After hashed token")

        const isToken=await User.findOne({"resetPassword.tokenHash":hashedToken,"resetPassword.expiresAt":{ $gt: Date.now() }})

        logger.debug("After the is token found from DB")

        console.log("user got by token in DB : ",isToken)

        if(!isToken){
            return failedResponse(STATUS_CODES.BAD_GATEWAY,[],"Token expired!",res)
        }
        
        req.user=isToken

        logger.debug("after the isToken validate")

        next() 
        //sent if that is valid to controler or sent it to the client if itisnot valid
    } catch (error) {
        logger.error(error)
        throw new Error("Some problem with reset link.")
    }
}

module.exports=tokenValidate