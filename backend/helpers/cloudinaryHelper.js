const cloudinary=require("../config/cloudinary")
const logger=require("../config/logger")
const updateUser=require("../helpers/updateUser")
const imageQueue=require("../queues/imageQueue")


async function deleteImageFromCloudinary(publicId,thumbailPublicId,userId) {
    try {

        logger.debug(`publicId: ${publicId}`)
        logger.debug(`thumbnailId: ${thumbailPublicId}`)
        logger.debug(`userId: ${userId}`)
        
        const deletedImage=await cloudinary.uploader.destroy(publicId)
        console.log("deletedImage : ",deletedImage)
        if(!["ok", "not found"].includes(deletedImage.result)){
            throw new Error(`Unexpected result: ${deletedImage.result}`)
        }

        if(thumbailPublicId){
            await imageQueue.add("delete-thumbnail",
            { thumbailPublicId, userId },
            {
                attempts: 5,
                backoff: { type: "exponential", delay: 3000 }
            }
        )}

        return true

    } catch (error) {
        logger.error(error)
        await updateUser(userId,{avatarDeletePending:true})
        return true
    }
}

module.exports=deleteImageFromCloudinary