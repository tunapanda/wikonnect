const redisClient = require('../utils/redisConfig');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const environment = process.env.NODE_ENV || 'development';



// const REDIS_URL = process.env.REDISCLOUD_URL || 'redis://localhost:6379';

// const redisClient = redis.createClient(REDIS_URL, {
//   enable_offline_queue: false,
// });


const env_rate_limiter = {
  ci: {
    redis: redisClient,
    keyPrefix: 'middleware',
    points: 300, // 300 requests for ctx.ip
    duration: 60, // per 1 second
  },
  test: {
    redis: redisClient,
    keyPrefix: 'middlewareTest',
    points: 1000, // 300 requests for ctx.ip
    duration: 600, // per 1 second
  },
  development: {
    // redis: redisClient,
    // keyPrefix: 'middleware',
    // points: 100, // 100 requests for ctx.ip
    // duration: 1, // per 1 second
    storeClient: redisClient,
    points: 300, // Number of points
    duration: 60, // Per 60 seconds,
    blockDuration: 120, // Block duration in store
    inmemoryBlockOnConsumed: 301, // If userId or IP consume >300 points per minute
    inmemoryBlockDuration: 120
  },
  production: {
    storeClient: redisClient,
    points: 300, // Number of points
    duration: 60, // Per 60 seconds,
    blockDuration: 120, // Block duration in store
    inmemoryBlockOnConsumed: 301, // If userId or IP consume >300 points per minute
    inmemoryBlockDuration: 120,
  }
};

const checkRateLimiter = new RateLimiterRedis(env_rate_limiter[environment]);


async function rateLimiterMiddleware(ctx, next) {
  // req.userId should be set
  const key = ctx.state.user.data.id ? ctx.state.user.data.id : ctx.ip;
  const pointsToConsume = ctx.state.user.data.id ? 1 : 30;
  try {
    await checkRateLimiter.consume(key, pointsToConsume);
    await next();
  } catch (error) {
    ctx.throw(429, 'Too Many Requests');
  }
}

async function rateLimiter(ctx, next) {
  try {
    await checkRateLimiter.consume(ctx.ip);
    await next();
  } catch (rejRes) {
    ctx.throw(429, 'Too Many Requests');
  }
}

module.exports = {
  rateLimiterMiddleware,
  rateLimiter
};

