const Model = require('./_model');
const knex = require('../db/db');

class Counter extends Model {
  static get tableName() {
    return 'counter';
  }

  // async $indexForSearch() {
  //   return null;
  // }

  static get relationMappings() {
    return {};
  }
}

Counter.knex(knex);
module.exports = Counter;
