const logger=require("../config/logger")

const HIDEFIELDS=[
    "password",
    "confirmPassword",
    "password",
    "token",
    "refreshToken"
]

const requestLogger=(req,res,next)=>{

    const dataBody={...req.body};

    for(let field of HIDEFIELDS){
        if(dataBody[field]){
            dataBody[field]="******"
        }
    }

    logger.info(`${req.method} ${req.originalUrl} | body: ${JSON.stringify(dataBody)}`);
    next()
}

module.exports= requestLogger;