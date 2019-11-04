const Model = require('./_model');
const knex = require('../db/db');

class Enrollment extends Model {
  static get tableName() {
    return 'enrollments';
  }

  static get relationMappings() {
    return {};
  }
}

Enrollment.knex(knex);
module.exports = Enrollment;
