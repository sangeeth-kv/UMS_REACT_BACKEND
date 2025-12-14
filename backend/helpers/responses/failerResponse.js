
function failedResponse(statusCode,errors=[],message,res){
    if(errors.length>0){
        return res.status(statusCode).json({success:false,errors,message})
    }else{
        return res.status(statusCode).json({success:false,message})
    }
}



module.exports=failedResponse