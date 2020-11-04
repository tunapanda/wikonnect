const pino = require('pino');
const log = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    levelFirst: true
  },
  prettifier: require('pino-pretty')
});

module.exports = log;