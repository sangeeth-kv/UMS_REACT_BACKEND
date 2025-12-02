const STATUS_CODES=require("../../utils/statusCodes");
const User=require("../../model/userModel");
const checkUser=require("../../helpers/checkUser");
const logger = require("../../config/logger");
const saveUser = require("../../helpers/saveUser");
const getUser=require("../../helpers/getUser");
const { verifyPassword } = require("../../helpers/passwordHelper");



const authController={


    verifySignin:async(req,res,next)=>{
        try {
            logger.debug("hited verifySignin")
            const isUser=await getUser(req.body.email)
            logger.debug(`user got in verify signin : ${isUser}`)
            if(!isUser.success)return res.status(STATUS_CODES.NOT_FOUND).json({success:false,errors:[{path:"email",message:isUser.message}]})
            const isPassword=await verifyPassword(req.body.password,isUser.user.password)
            logger.debug(`user password statement : ${isPassword}`)
            if(!isPassword){
                return res.status(STATUS_CODES.UNAUTHORIZED).json({success:false,errors:[{path:"password",message:"Incorrect password"}]})
            }

            

        } catch (error) {
            logger.error(`error in verifySignin : ${error}`)
            next(error)
        }
    },


    verifySignup:async (req,res,next) => {
        try {
            logger.debug("server hits on verify signup")
  
            const alreadyUser= await checkUser(req.body.email,req.body.phone)

            logger.debug("reaches alreadyuser ")

            if(alreadyUser.exists){
                return res.status(STATUS_CODES.CONFLICT).json({
                    success:false,errors:[{path:alreadyUser.mathchedField,message:`You have already an account using this ${alreadyUser.mathchedField}.`}]
                })
            }

            const user=await saveUser(req.body)

            logger.debug(`user got after save user => ${user}`)

            return res.status(STATUS_CODES.CREATED).json({success:true,message:"Account created successfully!"})


        } catch (error) {

            logger.error(`Signup Error: ${error.message}`);
            next(error)

        }
    }
}


module.exports=authController