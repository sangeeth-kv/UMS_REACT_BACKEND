require("dotenv").config(); 
const {Worker}=require("bullmq");
const bullRedis=require("../config/bullRedis");
const sendMail = require("../helpers/sendMail");
const logger = require("../config/logger");

const worker=new Worker("emailQueue",sendMail,{connection:bullRedis,lockDuration: 60000,concurrency: 1 })


worker.on("completed",(job)=>{
    logger.debug(`successFully sent the email : ${job.id} `)
    console.log(`✅ Job completed: ${job.id}`);
})

worker.on("failed", (job, err) => {  
  logger.error(`failed to send the email : ${job?.id}`);
  console.error(`❌ Job failed: ${job?.id}`, err);
});

