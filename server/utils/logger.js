const pino = require('pino');
const log = pino({
  name: 'Wikonnect ' + process.env.NODE_ENV || 'development',
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: {
    levelFirst: true
  },
  prettifier: require('pino-pretty')
});

module.exports = log;