const STATUS_CODES=require("../../utils/statusCodes");
const User=require("../../model/userModel");
const checkUser=require("../../helpers/checkUser");
const logger = require("../../config/logger");
const saveUser = require("../../helpers/saveUser");
const getUser=require("../../helpers/getUser");
const { verifyPassword } = require("../../helpers/passwordHelper");
const {createAccessToken,createRefreshToken}=require("../../utils/tokens")



const authController={


    verifySignin:async(req,res,next)=>{
        try {

            const isUser=await getUser(req.body.email)

            if(!isUser.success)return res.status(STATUS_CODES.NOT_FOUND).json({success:false,errors:[{path:"email",message:isUser.message}]})

            const isPassword=await verifyPassword(req.body.password,isUser.user.password)

            if(!isPassword){
                return res.status(STATUS_CODES.UNAUTHORIZED).json({success:false,errors:[{path:"password",message:"Incorrect password"}]})
            }

            const refreshToken=await createRefreshToken(isUser.user)
            const accessToken=await createAccessToken(isUser.user)


            res.cookie('refreshToken',refreshToken,{
                secure:process.env.NODE_ENV==="development"? false : true,
                httpOnly:true,
                sameSite:"strict",
                maxAge:7 * 24 * 60 * 60 * 1000,
            })

            return res.status(STATUS_CODES.OK).json({success:true,accessToken,message:"Successfully signin"})

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
            }

            const user=await saveUser(req.body)

            return res.status(STATUS_CODES.CREATED).json({success:true,message:"Account created successfully!"})
        } catch (error) {

            logger.error(`Signup Error: ${error.message}`);
            next(error)

        }
    }
}


module.exports=authController