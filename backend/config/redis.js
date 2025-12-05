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
})();

module.exports = client; 
