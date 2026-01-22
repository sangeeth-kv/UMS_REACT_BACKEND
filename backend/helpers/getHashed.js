const crypto=require("crypto");

function getRandomToken(){
    return crypto.randomBytes(32).toString("hex");
}

function getHashed(token){
    return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports={getHashed,getRandomToken}