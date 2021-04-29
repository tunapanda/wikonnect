// Update with your config settings.
const path = require('path');
const log = require('./utils/logger');
const BASE_PATH = path.join(__dirname, 'db');
let connections;

try {
  connections = require('./config/db');
} catch (e) {
  connections = require('./config/db.example');
}

const {
  POSTGRES_USER: user,
  POSTGRES_DB: database,
  POSTGRES_HOST: host,
  POSTGRES_PASSWORD: password,
  POSTGRES_PORT: port
} = process.env;
let env_credentials;

if (user && host && database && password) {
  env_credentials = {
    user,
    database,
    host,
    password,
    port
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
      directory: path.join(BASE_PATH, 'seeds/dev')
    }
  },
  action: {
    client: 'pg',
    connection: env_credentials || connections.action,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/dev')
    },
    log: {
      error(message) {
        log.fatal(message);
      },
      debug(message) {
        log.debug(message);
      },
    }
  },
  test: {
    client: 'pg',
    connection: env_credentials || connections.test,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/dev')
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
      directory: path.join(BASE_PATH, 'seeds/dev')
    },
  },
  production: {
    client: 'pg',
    connection: env_credentials || connections.production,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds/dev')
    },
    log: {
      error(message) {
        log.fatal(message);
      },
      debug(message) {
        log.debug(message);
      },
    }
  }
};
