const Model = require('./_model');
const knex = require('../db/db');

class Questionnaire extends Model {
  static get tableName() {
    return 'questionnaire';
  }
  static get relationMappings() {
    return {};
  }
}

Questionnaire.knex(knex);
module.exports = Questionnaire;
