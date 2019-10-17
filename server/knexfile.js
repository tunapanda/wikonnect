// Update with your config settings.
const path = require('path');
const BASE_PATH = path.join(__dirname, 'db');
let connections;

try {
  connections = require('./config/db');
} catch (e) {
  connections = require('./config/db.example');
}

const { PG_USER: user, PG_NAME: database, PG_HOST: host, PG_PASSWORD: password } = process.env;
let env_credentials;

if (user && host && database && password) {
  env_credentials = {
    user,
    database,
    host,
    password
  };
}

module.exports = {
  ci: {
    client: 'pg',
    connection: {
      port: process.env.PG_PORT,
      host: process.env.PG_HOST,
      database: process.env.PG_NAME,
      user: process.env.PG_USER
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  test: {
    client: 'pg',
    connection: env_credentials || connections.test,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    debug: true,
    client: 'pg',
    connection: env_credentials || connections.development,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: env_credentials || connections.production,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
