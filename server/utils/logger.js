const pino = require('pino');
const log = pino({ level: process.env.LOG_LEVEL || 'info' });

module.exports = log;