const Model = require('./_model');
const knex = require('../db/db');

class Questionnaire extends Model {
  static get tableName() {
    return 'questionnaires';
  }
}

Questionnaire.knex(knex);
module.exports = Questionnaire;
