const logger = require("../../config/logger")
const findAllUsers = require("../../helpers/findAllUsers")
const successResponse = require("../../helpers/responses/successResponse")
const STATUS_CODES=require("../../utils/statusCodes")


const userController={

    getAllUsers:async (req,res,next) => {
    try {
        logger.debug("hit on getAllusers function in controller : ")
        const users=await findAllUsers()
        console.log("users got from getAllUsers : => ",users)
        return successResponse(STATUS_CODES.OK,{users},"",res)
    } catch (error) {
        logger.error(`Error in getallUsers controller : ${error}`)
        next(error)
    }  
    }
    
}

module.exports=userController