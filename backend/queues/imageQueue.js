const {Queue} = require("bullmq")
const bullRedis = require("../config/bullRedis")

const imageQueue=new Queue("image-processing",{
    connection:bullRedis,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:5000
        },
    removeOnComplete: true,
    removeOnFail: false 
    }
})

module.exports=imageQueue

