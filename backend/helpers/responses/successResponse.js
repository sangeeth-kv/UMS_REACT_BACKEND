const logger = require("../../config/logger")



function successResponse(statusCode,data={},message,res){
    logger.debug(`data got in successRespsonse function  : ${data}`)
    if(data){
        return res.status(statusCode).json({success:true,data,message})
    }else{
        return res.status(statusCode).json({success:true,message})
    }
}

module.exports=successResponse