const Model = require('./_model');
const knex = require('../db/db');
const modelSchema = require('../db/json_schema/modelSchema');


class Course extends Model {
  static get tableName() {
    return 'courses';
  }

  static get jsonSchema(){
    return modelSchema;
  }

  static get relationMappings() {
    return {
      modules: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/module',
        join: {
          from: 'courses.id',
          through: {
            from: 'course_modules.course_id',
            to: 'course_modules.module_id'
          },
          to: 'modules.id'
        }
      }
    };
  }
}

Course.knex(knex);
module.exports = Course;
