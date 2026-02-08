const logger=require("../../config/logger")
const {getAllCounts,getAllTypeUsersList} = require("../../helpers/getAllCountsandUsersList")
const successResponse =require("../../helpers/responses/successResponse")
const STATUS_CODES=require("../../utils/statusCodes")



const adminController={

    getDashboard:async(req,res,next)=>{
        try {
            logger.debug("Hitted on getDashboard")
            const [counts,allUsers]=await Promise.all([getAllCounts(),getAllTypeUsersList()])
            return successResponse(STATUS_CODES.OK,{counts,allUsers},"",res)
        } catch (error) {
            logger.error( error)
            next(error)
        }
    }




}

module.exports=adminController