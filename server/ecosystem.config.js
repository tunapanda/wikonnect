module.exports = {
  apps: [{
    'name': 'api',
    'script': 'index.js',
    'log_date_format': 'YYYY-MM-DD HH:mm Z',
    'time': true,
    'watch': true,
    'watch_delay': 10000,
    'ignore_watch': ['public', 'node_modules'],
    'instances': 1,
    'autorestart': true,
    'max_memory_restart': '1G',
    'env': {
      'NODE_ENV': 'production'
    },
    'env_production': {
      'NODE_ENV': 'production'
    }
  }]
};
