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

module.exports={getUserIdfromRedis,deleteUserIdfromRedis,addUserId,checkIsblackListed}