const jwt=require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid");
const client=require("../config/redis")
const logger=require("../config/logger")
const {addUserId,getUserIdfromRedis} =require("../helpers/redisHelper")



async function createAccessToken(data){

    try {

        logger.debug(`data comes in the create access token function : ${data._id}`)
        const accessJti = uuidv4();

        const accessToken=jwt.sign({userId:data._id,role:data.role[0],fullname:data.fullname,email:data.email},process.env.ACCESS_TOKEN_SECRET,
            {jwtid:accessJti,expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
        )

        return accessToken
    } catch (error) {
        logger.error(`error in create accesss token : ${error}`)
    }
}

async function createRefreshToken(data){
    try {
        const refreshJti = uuidv4();

        const refreshToken=jwt.sign({userId:data._id,role:data.role[0],fullname:data.fullname,email:data.email},process.env.REFRESH_TOKEN_SECRET,{
            jwtid:refreshJti,expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        })

        logger.debug(`refresh token in the create refresh token function : ${refreshToken}`)

        // await client.set(`refresh:${refreshJti}`,String(data._id),{EX: 7 * 24 * 60 * 60})

        await addUserId(refreshJti,String(data._id),{EX: 7 * 24 * 60 * 60})

        const redisGotValue=await getUserIdfromRedis(refreshJti)

        logger.debug(`reddis got value in the : ${redisGotValue}`)

        logger.debug(`refresh token in create refresh TOken : ${refreshToken}`)
    
        return refreshToken;

    } catch (error) {
        logger.error(`error in create refresh token : ${error}`)
        
    }
}

function verifyRefreshToken(refreshToken){
   try {
        return jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
   } catch (error) {
        logger.error(`Error in verifyRefreshToken functino : ${error}`)
        return null;
   }
}

function getDecodedAccessToken(token){
    try {
        return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        logger.error(`Error in getDecodedRefreshToken functino : ${error}`)
        throw error;
    }
}

module.exports={
    createAccessToken,createRefreshToken,verifyRefreshToken,getDecodedAccessToken
}