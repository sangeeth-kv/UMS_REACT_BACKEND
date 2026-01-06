require("dotenv").config(); 
const {Worker}=require("bullmq")
const bullRedis=require("../config/bullRedis")
const processImages = require("../helpers/processImages");


new Worker("image-processing",processImages,{connection:bullRedis})
