const User=require("../model/userModel")
const logger=require("../config/logger")
async function checkUser(email,phone){
    try {

        
        const user=await User.findOne({$or:[{email:email},{phone:phone}]}).select("email phone").lean()

        if(!user)return {exists:false}

        let mathchedField=""
        if(user.email===email)mathchedField="email";
        if(user.phone===phone)mathchedField="phone";



        logger.debug(`checkUser => Found user by ${mathchedField}: ${JSON.stringify({
            email: user.email,
            phone: user.phone,
        })}`);

        return {exists:true,mathchedField:mathchedField,}  

    } catch (error) {
        logger.error(`Error checking user: ${error.message}`);
        return false;
    }
}

module.exports=checkUser