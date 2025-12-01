const winston=require("winston")
const DailyRotateFiles=require("winston-daily-rotate-file")


//this for log formating:
const customFormat=winston.format.printf(({level,message,timestamp})=>{
    return `[${timestamp}] ${level.toUpperCase()} : ${message}`
})


//create instance of logger

const logger=winston.createLogger({
    level:process.env.NODE_ENV =="development"?"debug":"info",

    format:winston.format.combine(winston.format.timestamp(),customFormat),

    transports:[

        //Console logs for development
        ...(process.env.NODE_ENV==="development" ?
            [
            new winston.transports.Console({
            level:"debug",
            format:winston.format.combine(winston.format.colorize(),winston.format.timestamp(),customFormat)  
            }),
            ] : []
        ),

        // Daily rotate file for all logs
        new DailyRotateFiles({
            dirname:"logs",
            filename:"combined-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
        }),

        //Daily rotate file for error logs only
        new DailyRotateFiles({
            dirname:"logs",
            filename:"errors-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "30d",
        })
    ]
})

module.exports=logger


