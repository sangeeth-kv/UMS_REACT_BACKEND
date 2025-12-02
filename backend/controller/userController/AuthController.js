const STATUS_CODES=require("../../utils/statusCodes");
const User=require("../../model/userModel");
const checkUser=require("../../helpers/checkUser");
const logger = require("../../config/logger");
const saveUser = require("../../helpers/saveUser");



const authController={

    
    verifySignin:async(req,res,next)=>{
        try {
            
        } catch (error) {
            logger.error(`error in verifySignin : ${error}`)
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