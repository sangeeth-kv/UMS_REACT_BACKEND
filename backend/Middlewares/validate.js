const {validationResult}=require("express-validator");
const STATUS_CODES=require("../utils/statusCodes")

function validate(req,res,next){
    console.log("hited")
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(STATUS_CODES.BAD_REQUEST).json({success:false,errors:errors.errors.map(err=>({path:err.path,message:err.msg}))})
    }
    next()
}

module.exports=validate