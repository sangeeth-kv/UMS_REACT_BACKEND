const {Queue} =require("bullmq");
const bullRedis=require("../config/bullRedis");

const emailQueue=new Queue("emailQueue",{
    connection:bullRedis,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:5000
        },
    removeOnComplete: true,
    removeOnFail: false // DLQ
    }
})

module.exports=emailQueue