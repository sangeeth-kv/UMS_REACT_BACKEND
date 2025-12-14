const logger=require("../config/logger");
const { checkIsblackListed } = require("../helpers/redisHelper");
const failerResponse=require("../helpers/responses/failerResponse")
const STATUS_CODES=require("../utils/statusCodes")
const {getDecodedAccessToken}=require("../utils/tokens")

async function verifyAccessToken(req,res,next){
    try {
        const token=req.headers.authorization?.split(" ")[1];

        logger.debug(`token when hitted ${req.method} and ${req.originalUrl}`)
        if(!token){
            return failerResponse(STATUS_CODES.UNAUTHORIZED,[],"TOKEN_EXPIRED",res)
        }


        logger.debug("after token exist checks : ")

        const decoded=getDecodedAccessToken(token)

        logger.debug("after decoded  verify checks : ")

        const jti = decoded.jti || decoded.jwtid;

        const isBlacklisted=await checkIsblackListed(jti)

        if(isBlacklisted){
            return failerResponse(STATUS_CODES.UNAUTHORIZED,[],"Session expired, need to login again",res)
        }

        logger.debug("after isblaclisted exist checks : ")

        req.user = decoded;

         next();

    } catch (error) {
        logger.error(`verifyAccessToken error: ${error}`)
        if(error.name==="TokenExpiredError"){
            return failerResponse(STATUS_CODES.UNAUTHORIZED,[],"TOKEN_EXPIRED",res)
        }
        if (error.name === "JsonWebTokenError" ||error.name === "NotBeforeError"){
            return failerResponse(STATUS_CODES.UNAUTHORIZED,[],"INVALID_TOKEN",res)
        }
        next(error)
    }
}
module.exports=verifyAccessToken

