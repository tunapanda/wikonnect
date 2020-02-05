const Model = require('./_model');
const knex = require('../db/db');
const enrollmentsSchema = require('../db/json_schema/enrollmentsSchema');

class Enrollment extends Model {
  static get tableName() {
    return 'enrollments';
  }

  static get jsonSchema(){
    return enrollmentsSchema;
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('enrollments.id', 'course_id');
      }
    };
  }
}

Enrollment.knex(knex);
module.exports = Enrollment;
