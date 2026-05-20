import { createClient } from "redis";
import envConfig from "../config/env-config";

const redis = createClient({
  url: envConfig.REDIS_URL,
});

redis.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await redis.connect();

  console.log("Redis connected");
})();

export default redis;
