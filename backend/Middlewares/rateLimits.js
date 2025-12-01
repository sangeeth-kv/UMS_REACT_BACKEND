const rateLimits=require("express-rate-limit");


const authLimiter=rateLimits({
    windowMs:15*60*1000,
    limit:9,
    statusCode:429,
    message:{success:false,message:"Too many requests, please try after 5 minutes",},
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports=authLimiter