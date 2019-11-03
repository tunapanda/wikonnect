const Model = require('./_model');
const knex = require('../db/db');

class Acheivement extends Model {
  static get tableName() {
    return 'acheivements';
  }

  static get relationMappings() {
    return {};
  }
}

Acheivement.knex(knex);
module.exports = Acheivement;
