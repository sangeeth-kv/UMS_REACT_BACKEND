const logger = require("../../config/logger")
const findAllUsers = require("../../helpers/findAllUsers")
const successResponse = require("../../helpers/responses/successResponse")
const STATUS_CODES=require("../../utils/statusCodes")


const userController={

    getAllUsers:async (req,res,next) => {
    try {
        logger.debug("hit on getAllusers function in controller : ")
        const {page,limit}=req.query
        console.log("req ffff : ",page,limit)
        const users=await findAllUsers(page,limit)
        console.log("users got from getAllUsers : => ",users)
        return successResponse(STATUS_CODES.OK,{users:users.allUsers,totalPage:users.totalPages},"",res)
    } catch (error) {
        logger.error(`Error in getallUsers controller : ${error}`)
        next(error)
    }  
    }
    
}

module.exports=userController