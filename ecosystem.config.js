module.exports = {
  apps: [{
    "name": 'api',
    "script": 'server/index.js',
    "log_date_format": "YYYY-MM-DD HH:mm Z",
    "time": true,
    "watch": true,
    "watch": ['frontend'],
    "watch_delay": 10000,
    "ignore_watch": ['server/public', 'server/node_modules', 'frontend/node_modules', 'node_modules', 'docs'],
    "instances": 1,
    "autorestart": true,
    "max_memory_restart": '1G',
    "env": {
      "NODE_ENV": 'production'
    },
    "env_production": {
      "NODE_ENV": 'production'
    }
  }]
};
