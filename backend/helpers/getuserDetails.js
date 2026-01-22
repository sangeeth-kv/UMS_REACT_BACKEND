const logger =require("../config/logger");
const UserProfile = require("../model/userProfile");
const UserModel=require("../model/userModel")
const mongoose = require("mongoose");
const mapUserDetails = require("../mappers/userDetailsMapper");



async function getUserDetails(userId){
    const user=await UserModel.findById(userId).select("fullname phone email isBlocked isDeleted isVerified createdAt _id avatar avatarThumbStatus thumbnail role")

    if(!user){
        return {success:false, message:"User not found"}
    }
    const profile=await UserProfile.findOne({userId: new mongoose.Types.ObjectId(userId)}).select("gender dateOfBirth bloodGroup address isProfileCompleted")
    console.log("profile => : ",profile)

    if(!profile){
        return {success:false,message:"User not found"}
    }

    const userDetails=mapUserDetails(user,profile)

    console.log("user details + user : : ",userDetails)

    return {success:true,userDetails}

}

module.exports=getUserDetails