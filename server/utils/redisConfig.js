const redis = require('redis');

const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
};

const redisClient = redis.createClient(options); // default setting.


redisClient.on('connect', function () {
  console.time('Connected to Redis client');
  console.timeEnd('Connected to Redis client');
});

module.exports = redisClient;
