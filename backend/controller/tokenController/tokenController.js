const failedResponse =require("../../helpers/responses/failerResponse");
const successResponse =require("../../helpers/responses/successResponse");
const STATUS_CODES=require("../../utils/statusCodes");
const {verifyRefreshToken,createAccessToken,createRefreshToken}=require("../../utils/tokens")
const {getUserIdfromRedis,deleteUserIdfromRedis} =require("../../helpers/redisHelper");
const getUser = require("../../helpers/getUser");
const logger=require("../../config/logger");
const setUserDetails = require("../../helpers/setUserDetails");
const getUserDetails = require("../../helpers/getuserDetails");


const tokenController={

    getAccessToken:async (req,res,next)=>{

        try {
        
            const refreshToken=req.cookies.refreshToken;
            
            // logger.debug(`REFRESH TOKEN GOT IN THE COOKIES IN getAccessToken : ${refreshToken} `)
            
            if(!refreshToken){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[],"Session expired !",res)
            }
        
            const decode=verifyRefreshToken(refreshToken)

            if(!decode){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[],"Session expired !",res)
            }
        
        
            const jwtit=await getUserIdfromRedis(decode.jti)

            // logger.debug(`jwtit got in token Contoller : ${jwtit} `)
        
            if(!jwtit){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[],"Session expired !",res)
            }
        
            const user=await getUser(decode.email)

            const oldJti = decode.jti;

            await deleteUserIdfromRedis(oldJti)

            if(!user.success){
                return failedResponse(STATUS_CODES.NOT_FOUND,[],"No User Found !",res)
            }
            
            const newAccessToken=await createAccessToken(user.user)
            const newRefreshToken=await createRefreshToken(user.user)
        
            res.cookie('refreshToken',newRefreshToken,{
                    secure:process.env.NODE_ENV==="development"? false : true,
                    httpOnly:true,
                    sameSite:"strict",
                    maxAge:7 * 24 * 60 * 60 * 1000,
            })

            const userDetails=setUserDetails(user.user);
            const userIsProfileComplete=await getUserDetails(userDetails._id)
            // console.log("sdjhfjksadf : ",userIsProfileComplete)
        
            return successResponse(STATUS_CODES.OK,{accessToken: newAccessToken,user:userDetails,isProfileCompleted:userIsProfileComplete.userDetails.profile.isProfileCompleted},"",res)

        } catch (error) {
            logger.debug(`error in the getAccessToken : ${error}`)
            next(error)
        }
    },
    test:async (req,res) => {
        console.log(req.headers)
    }
}

module.exports=tokenController