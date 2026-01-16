require("dotenv").config();
const connectDB = require("../config/connectDB");
const sharp = require("sharp");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const User = require("../model/userModel");
connectDB();

async function processImages(job) {
  if (job.name === "generate-thumbnail") {
    try {
      console.log("hitted!!!!", job.name);

      const { imageUrl, publicId, folder, model, modelId, field } = job.data;

      console.log("job.data :  : :", job.data);

      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      const thumbBuffer = await sharp(response.data)
        .resize(150, 150)
        .jpeg({ quality: 70 })
        .toBuffer();

      console.log("thumb buffer : ", thumbBuffer);

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

        const user = await User.findById(modelId);
        if (!user ||!user.avatar || !user.avatar.url) {
              // Avatar was deleted or replaced
              return true; // DO NOTHING
          }

        console.log("usersssss>>>");
        await User.findByIdAndUpdate(modelId, {
          $set: {
            "avatar.thumbnailUrl": thumb.secure_url,
            "avatar.thumbnailPublicId": thumb.public_id,
            avatarThumbStatus: "ready",
          },
        });
      }
    } catch (err) {
      console.error("err in processimage:", err);
      throw err; 
    }
  }else if(job.name==="delete-thumbnail"){
    try {
      console.log("job.data in delete thumbnail: ",job.data)
      const {thumbailPublicId,userId}=job.data
      const deletethumbnailavatar=await cloudinary.uploader.destroy(thumbailPublicId)
      console.log("delete thumbnail : ",deletethumbnailavatar)
      if(!["ok","not found"].includes(deletethumbnailavatar.result)){
        throw new Error(`Unexpected result: ${deletethumbnailavatar.result}`)
      }
      return true

    } catch (error) {
      const user=await User.findByIdAndUpdate(userId,{thumbnailAvatarPending:true})
      console.log("user : ",user)
    }
  }
}

module.exports = processImages;
