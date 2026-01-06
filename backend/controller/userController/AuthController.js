const STATUS_CODES=require("../../utils/statusCodes");
const User=require("../../model/userModel");
const checkUser=require("../../helpers/checkUser");
const logger = require("../../config/logger");
const saveUser = require("../../helpers/saveUser");
const getUser=require("../../helpers/getUser");
const { verifyPassword } = require("../../helpers/passwordHelper");
const {createAccessToken,createRefreshToken}=require("../../utils/tokens")
const failedResponse=require("../../helpers/responses/failerResponse")
const successResponse=require("../../helpers/responses/successResponse")
const checkIsBlocked=require("../../helpers/checkIsBlocked")
const setUserDetails=require("../../helpers/setUserDetails");
const getUserDetails = require("../../helpers/getuserDetails");





const authController={


    verifySignin:async(req,res,next)=>{
        try {

            const isUser=await getUser(req.body.email)

            if(!isUser.success){
                return failedResponse(STATUS_CODES.NOT_FOUND,[{path:"email",message:isUser.message}],"No user found",res)
            }

            const isBlockedUser=await checkIsBlocked(isUser.user)

            if(isBlockedUser){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[{path:"email",message:"User with this email is blocked"}],"Blocked by admin",res)
            }

            const isPassword=await verifyPassword(req.body.password,isUser.user.password)            

            if(!isPassword){
                return failedResponse(STATUS_CODES.UNAUTHORIZED,[{path:"password",message:"Incorrect password"}],"Incorrect password",res)
            }

            const refreshToken=await createRefreshToken(isUser.user)
            const accessToken=await createAccessToken(isUser.user)

            // logger.debug(`refresh token in sign in auth : ${refreshToken}`)

            logger.debug("reached here! 1")

            const user=setUserDetails(isUser.user)

            logger.debug("reached here! 2")

            const isProfileCompleted=await getUserDetails(isUser.user._id)

            logger.debug("reached here! 3")

            const profile=isProfileCompleted.userDetails.profile.isProfileCompleted

            logger.debug("reached here! 4")

            res.cookie('refreshToken',refreshToken,{
                secure:process.env.NODE_ENV==="development"? false : true,
                httpOnly:true,
                sameSite:"strict",
                maxAge:7 * 24 * 60 * 60 * 1000,
            })

            // return res.status(STATUS_CODES.OK).json({success:true,accessToken,message:"Successfully signin"})
            return successResponse(STATUS_CODES.OK,{accessToken,user,profile},"Successfully signin",res)

        } catch (error) {
            logger.error(`error in verifySignin : ${error}`)
            next(error)
        }
    },


    verifySignup:async (req,res,next) => {
        try {
  
            const alreadyUser= await checkUser(req.body.email,req.body.phone)

            if(alreadyUser.exists){
                return res.status(STATUS_CODES.CONFLICT).json({
                    success:false,errors:[{path:alreadyUser.mathchedField,message:`You have already an account using this ${alreadyUser.mathchedField}.`}]
                })
                // return failedResponse(STATUS_CODES.CONFLICT,[{path:alreadyUser.mathchedField,message:`You have already an account using this ${alreadyUser.mathchedField}.`},"",res])
            }

            const user=await saveUser(req.body)

            return res.status(STATUS_CODES.CREATED).json({success:true,message:"Account created successfully!"})
        } catch (error) {

            logger.error(`Signup Error: ${error.message}`);
            next(error)

        }
    },
    
}


module.exports=authController