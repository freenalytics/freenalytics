import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URI
});

export default redisClient;
