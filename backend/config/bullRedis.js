const IORedis = require("ioredis");

 const bullRedis = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

module.exports =bullRedis
