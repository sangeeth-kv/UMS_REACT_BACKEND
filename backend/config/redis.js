// const { createClient } = require("redis");
// const logger = require("./logger");

// const client = createClient({
//   url: process.env.REDIS_URL,
// });


// client.on("connect", () => {
//   console.log("🔥 Redis Connected Successfully");
// });

// client.on("error", (err) => {
//   logger.error("❌ Redis Error:", err);
//   console.log(":asdgfjksadf : ",err)
// });


// (async () => {
//   await client.connect();
// })();

// (async () => {
//   const res = await client.set("email-otp:testuser", "123456", { EX: 100 });
//   console.log("SET RESULT:", res); // should print 'OK'

//   const val = await client.get("email-otp:testuser");
//   console.log("GET RESULT:", val); // should print '123456'
// })();

// module.exports = client; 


const { createClient } = require("redis");
const logger = require("./logger");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("🔥 Redis Connected Successfully");
});

client.on("error", (err) => {
  logger.error("❌ Redis Error:", err);
});

(async () => {
  await client.connect();
  await client.select(0);
})();

module.exports = client;
