const cloudinary=require("../config/cloudinary")
const imageQueue=require("../queues/imageQueue")
const logger = require("../config/logger")


async function uploadOriginalImageAndQueue({buffer,folder,model,modelId,field}) {
    try {

        logger.debug("reached here 1")
        const original=await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${buffer.toString("base64")}`,
            {folder:`UMS_REACT/${folder}/originals`}
        )

        logger.debug("reached here 2 : ",original)
        console.log("orginal url : ",original)

        await imageQueue.add("generate-thumbnail",{
            imageUrl:original.secure_url,
            publicId: original.public_id,
            folder,
            model,
            modelId,
            field
        })

        logger.debug("reached here 3")

        return {original_url:original.secure_url,original_publicId:original.public_id}

    } catch (error) {
        logger.error(error)
        throw Error("error in uploading image")
    }
}

module.exports={uploadOriginalImageAndQueue}



