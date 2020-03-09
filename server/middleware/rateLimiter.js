const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const REDIS_URL = process.env.REDISCLOUD_URL || 'redis://localhost:6379';
console.log(REDIS_URL);

const redisClient = redis.createClient(REDIS_URL, {
  enable_offline_queue: false,
});

const checkRateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: 'middleware',
  points: 100, // 100 requests for ctx.ip
  duration: 1, // per 1 second
});

module.exports = async function rateLimiter(ctx, next) {
  try {
    await checkRateLimiter.consume(ctx.ip);
    await next();
  } catch (rejRes) {
    ctx.throw(429, 'Too Many Requests');
  }
};
