const knex = require('./db');

function Users() {
  return knex('users');
}

// *** queries *** //

function getAll() {
  return Users().select();
}

module.exports = {
  getAll: getAll
};