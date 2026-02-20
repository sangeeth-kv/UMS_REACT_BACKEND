const logger=require("../config/logger")
const failerResponse=require("../helpers/responses/failerResponse")
const STATUS_CODE=require("../utils/statusCodes")

async function requireRole(req,res,next) {
    try {
        const role=req.user.role
        if(role!=="admin"){
            return failerResponse(STATUS_CODE.UNAUTHORIZED,[],"You cant access admin area",res)
        }
        next()
    } catch (error) {
        logger.error(error)
        throw new Error("Some problem , Please try after sometimes")
    }
}

module.exports=requireRole