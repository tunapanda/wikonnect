const pino = require('pino');
const level = process.env.NODE_ENV === 'test' ? 'error' : 'info';
const log = pino({
  name: 'Wikonnect ' + process.env.NODE_ENV || 'development',
  // level: process.env.LOG_LEVEL || 'info'
  level: level,
  prettyPrint: {
    levelFirst: true
  },
  prettifier: require('pino-pretty')
});

module.exports = log;