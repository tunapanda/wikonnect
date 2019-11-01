const Model = require('./_model');
const knex = require('../db/db');

class Activity extends Model {
  static get tableName() {
    return 'activity';
  }

  static get relationMappings() {
    return {};
  }
}

Activity.knex(knex);
module.exports = Activity;
