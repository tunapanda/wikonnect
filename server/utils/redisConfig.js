const redis = require('redis');
const redisClient = redis.createClient(); // default setting.


module.exports = redisClient;