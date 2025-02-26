import { config } from "dotenv";
import Redis from "ioredis";

config();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

redis.on("connect", () => console.log("Connection established"));
redis.on("error", (err) => {
  console.error("Redis connection error: ", err);
});

async function testConnection() {
  try {
    const pong = await redis.ping();
    if (pong === "PONG") {
      console.log("Redis ping successful.");
    } else {
      console.error("Redis ping failed.");
    }
  } catch (error) {
    console.error("Error during Redis ping:", error);
  } finally {
    // redis.disconnect();
  }
}

testConnection();

export default redis;
