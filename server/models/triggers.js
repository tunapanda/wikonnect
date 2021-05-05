const Model = require('./_model');
const knex = require('../db/db');

class Trigger extends Model {
  static get tableName() {
    return 'triggers';
  }
}

Trigger.knex(knex);
module.exports = Trigger;
