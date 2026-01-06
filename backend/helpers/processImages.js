    require("dotenv").config();
    const connectDB=require("../config/connectDB")
    const sharp=require("sharp")
    const axios=require("axios")
    const cloudinary=require("../config/cloudinary")
    const User=require("../model/userModel") ;
    connectDB();

    async function processImages(job) {

        const { imageUrl, folder, model, modelId, field } = job.data;

        const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        });

        const thumbBuffer = await sharp(response.data)
        .resize(150, 150)
        .jpeg({ quality: 70 })
        .toBuffer();

        console.log("thumb buffer : ",thumbBuffer)

        let thumb; 

    try {
    thumb = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${thumbBuffer.toString("base64")}`,
    {
      folder: `UMS_REACT/${folder}/thumbnails`,
    }
  );
} catch (error) {
  console.error("Cloudinary upload failed:", error);
  throw error; // important for Bull retry
}


        if (model === "User") {
            console.log("usersssss>>>")
        await User.findByIdAndUpdate(modelId, {
            thumbnail: thumb.secure_url,
            avatarThumbStatus: "ready",
        });
        }

    }

    module.exports=processImages