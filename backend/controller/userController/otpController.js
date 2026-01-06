const logger = require("../../config/logger")
const {generateOtp,hashOtp, verifyHashOtp}=require("../../utils/generateOtp")
const {setOtp,getOtp,deleteOtp, getTTL}=require("../../helpers/redisHelper")
const emailQueue = require("../../queues/emailQueue")
const STATUS_CODES=require("../../utils/statusCodes")
const successResponse = require("../../helpers/responses/successResponse")
const failedResponse = require("../../helpers/responses/failerResponse")
const getUser = require("../../helpers/getUser")
const updateUser=require("../../helpers/updateUser")
const setUserDetails = require("../../helpers/setUserDetails")


const otpController={
    getOtpPage:async (req,res,next) => {
        try {
            logger.debug("Hitted on getOtpPage in otpController.")
            const userId = req.user.userId;
            const email = req.user.email;
            console.log("reque user :  ",req.user)

            //checking otp is already existed..
            const existingOtp=await getOtp(userId)
            console.log("existing otp : ",existingOtp)

            // if(existingOtp){
            //     await deleteOtp(userId)
            // }

            //generate otp 
            const otp=generateOtp()
            const hashedOtp=hashOtp(otp,userId)

            //save to the redis database
            await setOtp(hashedOtp,userId)
            const expiresAt=await getTTL(userId)
            //here need redis+bullMq for message queue,send email,subject,otp...

            await emailQueue.add("sendEmailOtp",{email,otp})
            //return to otp page
            return successResponse(STATUS_CODES.OK,{redirectUrl:"/otp",expiresAt:expiresAt},`Otp has sent to ${email}. please verify it.`,res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    verifyOtp:async (req,res,next) => {
        try {
            logger.debug("gitted in verifyOtp")
            console.log("user isn verif otp : ",req.user)
            const otp =req.body.otp;
            const userId=req.user.userId
            const email=req.user.email
            console.log(userId)

            const storedHashedOtp=await getOtp(userId)
            console.log("otp store redish hash : ",storedHashedOtp)

            if(!storedHashedOtp){
                return failedResponse(STATUS_CODES.BAD_REQUEST,[],"Otp has expired request for new otp.",res)
            }

            const isVerifedOtp=verifyHashOtp(otp,storedHashedOtp,userId)

            console.log("isverifyed : ",isVerifedOtp)

            if(!isVerifedOtp){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[],"Invalid otp entered.!",res)
            }


            await deleteOtp(userId)

            // const updatedUser=await updateUser(email, "isVerified", "verified");
            const updatedUser=await updateUser(userId, {isVerified:"verified"});
            const isUser=await getUser(email)
            const user=setUserDetails(isUser.user)

            return successResponse(STATUS_CODES.OK,{user},"Successfuly verified",res)

        } catch (error) {
            logger.error(`error in the verify otp controller : ${error}`)
            next(error)
        }
    }
}

module.exports=otpController