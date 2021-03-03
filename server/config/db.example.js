module.exports = {
  action: {
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  test: {
    host: 'localhost',
    database: 'swag_test',
    user: 'swag',
    password: 'password',
    port: '5432'
  },
  development: {
    host: 'localhost',
    database: 'swag_dev',
    user: 'swag',
    password: 'password',
    port: '5432'
  },
  production: {
    host: 'localhost',
    database: 'swag',
    user: 'swag',
    password: 'password',
    port: '5432'
  }
};
