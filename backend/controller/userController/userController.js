const logger = require("../../config/logger")
const findAllUsers = require("../../helpers/findAllUsers")
const getUserDetails=require("../../helpers/getuserDetails")
const failedResponse = require("../../helpers/responses/failerResponse")
const successResponse = require("../../helpers/responses/successResponse")
const saveUserProfile = require("../../helpers/saveUserProfile")
const updateUser = require("../../helpers/updateUser")
const { uploadOriginalImageAndQueue } = require("../../services/imageUploadService")
const STATUS_CODES=require("../../utils/statusCodes")


const userController={

    getAllUsers:async (req,res,next) => {
    try {
        logger.debug("hit on getAllusers function in controller : ")
        const {page,limit}=req.query
        console.log("req ffff : ",page,limit)
        const users=await findAllUsers(page,limit)
        console.log("users got from getAllUsers : => ",users)
        return successResponse(STATUS_CODES.OK,{users:users.allUsers,totalPage:users.totalPages},"",res)
    } catch (error) {
        logger.error(`Error in getallUsers controller : ${error}`)
        next(error)
    }  
    },

    getUserDetails:async (req,res,next) => {
        try {
            logger.debug("Hitted on getUser details controller")
            logger.debug(`user from verifyaccess token req.user : ${req.user}`)
            console.log("user from verifyaccess token req.user : ", req.user)
            const userId=req.user.userId
            if(!userId){
                return failedResponse(STATUS_CODES.BAD_REQUEST,[],"Session expired need to login again",res)
            }
            const userDetails=await getUserDetails(userId)
            if(!userDetails.success){
                return failedResponse(STATUS_CODES.NOT_FOUND,[],userDetails.message,res)
            }
            return successResponse(STATUS_CODES.OK,{userProfile:userDetails.userDetails},"",res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    addUserProfileDetails:async (req,res,next) => {
        try {
            logger.debug("Hitted on addUsedProfileDetails")
            console.log("add user controller: ",req.body)

            const {userId,email}=req.user
            const data=req.body

            const userProfile=await saveUserProfile(userId,data)

            if(!userProfile.success){
                return failedResponse(STATUS_CODES.NOT_FOUND,[],userProfile.message,res)
            }

            return successResponse(STATUS_CODES.OK,{profile:userProfile.getUser.isProfileCompleted},userProfile.message,res)

        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    updateUserProfileDetails:async (req,res,next) => {
        try {
            console.log("req.body of upateUserprofileDetails : ",req.body)
            console.log("req.user of upadateUserProfileDetails : ",req.user)
            const user=await saveUserProfile(req.user.userId,req.body)

            if(!user.success){
                return failedResponse(STATUS_CODES.BAD_REQUEST,[],"No user found",res)
            }
            return successResponse(STATUS_CODES.OK,{},"profile updated successFully",res)

        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    updateUserAvathar:async (req,res,next) => {
        try {
            logger.debug("hitted on update avathar!!")
            console.log(req.file)

            const avatharUrl=await uploadOriginalImageAndQueue({
                buffer:req.file.buffer,
                folder:"avatars",
                model:"User",
                modelId:req.user.userId,
                field:"avatar"
            })

            console.log("avathat url : ",avatharUrl)

            // await updateUser(req.user.email,"avatar",avatharUrl)
            // await updateUser(req.user.email,"avatarThumbStatus","processing")

            await updateUser(req.user.userId,{avatar:avatharUrl,avatarThumbStatus:"processing"})

            const userDetails=await getUserDetails(req.user.userId)

            console.log(userDetails.userDetails)

            return successResponse(STATUS_CODES.OK,{user:userDetails.userDetails},"profile updated successfully",res)

        } catch (error) {
            logger.error(error)
            next(error)
        }
    }

    
}

module.exports=userController