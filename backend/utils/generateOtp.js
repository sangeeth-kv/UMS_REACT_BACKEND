const crypto=require("crypto")

function generateOtp(){ 
    return crypto.randomInt(100000, 999999).toString();
}

function hashOtp(otp,userId){
   return crypto.createHmac("sha256",process.env.OTP_SECRET).update(`${otp}:${userId}`).digest("hex");
}

function verifyHashOtp(userOtp,hashedOtp,userId){
    const userOtpHashed=hashOtp(userOtp,userId)
    return hashedOtp===userOtpHashed
}
module.exports={
    generateOtp,hashOtp,verifyHashOtp
}