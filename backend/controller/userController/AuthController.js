const STATUS_CODES=require("../../utils/statusCodes");
const User=require("../../model/userModel");
const checkUser=require("../../helpers/checkUser");
const logger = require("../../config/logger");



const authController={
    verifySignin:async(req,res)=>{
        console.log("server hits on verify login")
        
        
        
    },
    verifySignup:async (req,res) => {
        console.log("server hits on verify signup")
        const {fullname,email,phone,password}=req.body;
        const alreadyUser= await checkUser(email,phone)

        logger.debug("reaches alreadyuser ")

        if(alreadyUser.exists){
            return res.status(STATUS_CODES.CONFLICT).json({
                success:false,errors:[{path:alreadyUser.mathchedField,message:`You have already an account using this ${alreadyUser.mathchedField}.`}]
            })
        }

        return res.status(STATUS_CODES.CREATED).json({success:true,message:"You have successfully created the account..!"})
    }
}


module.exports=authController