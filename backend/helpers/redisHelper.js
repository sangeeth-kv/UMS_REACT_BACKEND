const client=require("../config/redis")
const logger=require("../config/logger")



async function getUserIdfromRedis(jwtid){
    try {
        logger.debug(`jwiti got in the getUserIdfromRedis : ${jwtid}`)
        return await client.get(`refresh:${jwtid}`)
    } catch (error) {
        logger.debug(`error in the getUserIdFromRedis function : ${error}`)
    }
}

async function deleteUserIdfromRedis(jwtid) {
     try {
        await client.del(`refresh:${jwtid}`)
     } catch (error) {
        logger.debug(`error in the deleteUserIdFromRedis function : ${error}`)
     }
}

async function addUserId(jwtid, userId, options = {}) {
    try {
        await client.set(`refresh:${jwtid}`, userId, options);
    } catch (error) {
        logger.debug(`error in the addUserId function : ${error}`)
    }
}

async function checkIsblackListed(jwiti) {
    try {
        const isBlacklisted=await client.get(`blacklist:${jwiti}`)
        return isBlacklisted
    } catch (error) {
        logger.debug(`error in the checkIsblackListed function  : ${error}`)
    }
}

async function setOtp(otpHash,userId) {
    try {
        await client.set(`email-otp:${userId}`,otpHash,{ EX: 300 })
        // await client.set(`email-otp:${userId}`,otpHash,{ EX: 100 });
    } catch (error) {
        logger.error(`error in the setOtp function : ${error}`)
    }
}

async function deleteOtp(userId) {
    try {
        await client.del(`email-otp:${userId}`)
    } catch (error) {
        logger.error(`error in the deleteOtp function : ${error}`)
    }
}

async function getOtp(userId) {
    try {
        const otp=await client.get(`email-otp:${userId}`)
        console.log("otp in get otp : ",otp)
        return otp
    } catch (error) {
        logger.error(`error in the getOtp function : ${error}`)
    }
}

async function getTTL(userId) {
    try {
        const ttl=await client.ttl(`email-otp:${userId}`)
        return ttl
    } catch (error) {
        logger.error(`error in the getOtp function : ${error}`)
    }
}

async function blacklist(jwiti,exp) {
    try {
        const ttl = exp - Math.floor(Date.now() / 1000);
         if (ttl > 0) {
        await client.set(`blacklist:${jwiti}`,"true",
            { EX: ttl }
        );
    }
    } catch (error) {
        logger.error(`error in the getOtp function : ${error}`)
    }
}
module.exports={getUserIdfromRedis,deleteUserIdfromRedis,addUserId,checkIsblackListed,setOtp,getOtp,deleteOtp,getTTL,blacklist}