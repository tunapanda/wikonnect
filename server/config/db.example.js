module.exports = {
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
    port: '5434'
  },
  production: {
    host: 'localhost',
    database: 'swag',
    user: 'swag',
    password: 'password',
    port: '5432'
  }
};
