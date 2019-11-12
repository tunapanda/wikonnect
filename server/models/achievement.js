const Model = require('./_model');
const knex = require('../db/db');

class Achievement extends Model {
  static get tableName() {
    return 'achievements';
  }

  static get relationMappings() {
    return {};
  }
}

Achievement.knex(knex);
module.exports = Achievement;
