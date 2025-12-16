const UserProfile=require("../model/userProfile")
const logger=require("../config/logger")
const mongoose=require("mongoose")

async function saveUserProfile(userId,data) {
    try {

        const {gender,dateOfBirth,bloodGroup,address}=data
        const isProfileCompleted= !!gender && !!dateOfBirth && !!bloodGroup && !!address.place && !!address.city && !!address.state && !!address.pincode;
        const getUser=await UserProfile.findOneAndUpdate({userId:new mongoose.Types.ObjectId(userId)},{
            $set:{
                gender,
                dateOfBirth,
                bloodGroup,
                address,
                isProfileCompleted
            },
        },
        {new:true,upsert:true})

        if(!getUser){
            return {success:false,message:"No user address found or no user found.."}
        }

        return {success:true,message:"Profile added successfully",getUser}

    } catch (error) {
        logger.error(error)
        throw error
    }
}

module.exports=saveUserProfile