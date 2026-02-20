const User=require("../model/userModel")


async function getUserById(userId) {
    try {
        const user=await User.findById(userId).lean()
        console.log(user)
        if(user){
            return {success:true,user}
        }else{
            return {success:false}
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports=getUserById