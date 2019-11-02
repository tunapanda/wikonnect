const Model = require('./_model');
const knex = require('../db/db');

class Module extends Model {
  static get tableName() {
    return 'modules';
  }

  static get relationMappings() {
    return {
      lessons: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/lesson',
        join: {
          from: 'modules.id',
          through: {
            from: 'module_lessons.module_id',
            to: 'module_lessons.lesson_id'
          },
          to: 'lessons.id'
        }
      }
    };
  }
}

Module.knex(knex);
module.exports = Module;
