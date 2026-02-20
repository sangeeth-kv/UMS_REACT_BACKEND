const logger=require("../../config/logger")
const {getAllCounts,getAllTypeUsersList} = require("../../helpers/getAllCountsandUsersList")
const successResponse =require("../../helpers/responses/successResponse")
const STATUS_CODES=require("../../utils/statusCodes")
const updateUser=require("../../helpers/updateUser")
const getUserById = require("../../helpers/getUserById")



const adminController={

    getDashboard:async(req,res,next)=>{
        try {
            logger.debug("Hitted on getDashboard")
            const [counts,allUsers]=await Promise.all([getAllCounts(),getAllTypeUsersList()])
            return successResponse(STATUS_CODES.OK,{counts,allUsers},"",res)
        } catch (error) {
            logger.error( error)
            next(error)
        }
    },
    toggleBlock:async (req,res,next) => {
        try {
            logger.debug("Hitted on toggle block")
            logger.debug(`req body : ${req.body.userId} , ${req.body.reason}`)

            const blockedUser=await getUserById(req.body.userId)

            if(blockedUser.success){
                console.log(blockedUser)
                await updateUser(req.body.userId,{isBlocked:{
                    userIsBlocked:!blockedUser.user.isBlocked.userIsBlocked,
                    reason:req.body.reason,
                    blockedBy:req.user.userId
                }})
            }

            logger.debug("After blocked user")

            return successResponse(STATUS_CODES.OK,{},"Successfully updated! ",res)
            
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    deleteUser:async (req,res,next) => {
        try {
            logger.debug("Hitted on delete User controller")
            logger.debug(`req body : ${req.body.reason}  and ${req.body.userId}`)

            await updateUser(req.body.userId,{
                isDeleted:{
                    userIsDeleted:true,
                    reason:req.body.reason,
                    deletedBy:{
                        id:req.user.userId,
                        role:req.user.role
                    }
                }
            })

            return successResponse(STATUS_CODES.OK,{},"Successfull Deleted",res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }




}

module.exports=adminController