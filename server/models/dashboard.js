const Model = require('./_model');
const knex = require('../db/db');

class Dashboard extends Model {
  static get tableName() {
    return 'dashboard';
  }
}
Dashboard.knex(knex);
module.exports = Dashboard;
