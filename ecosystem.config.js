module.exports = {
  apps: [{
    "name": 'api',
    "script": 'server/index.js',
    "watch": true,
    "watch": ['frontend'],
    "watch_delay": 10000,
    "ignore_watch": ['server/public', 'node_modules', 'docs'],
    "instances": 1,
    "autorestart": true,
    "max_memory_restart": '1G',
    "env": {
      "NODE_ENV": 'development'
    },
    "env_production": {
      "NODE_ENV": 'production'
    }
  }]
};
