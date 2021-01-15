const redis = require('redis');
const redisClient = redis.createClient(); // default setting.


redisClient.on('connect', function () {
  console.time('Connected to Redis client');
  console.timeEnd('Connected to Redis client');
});

module.exports = redisClient;