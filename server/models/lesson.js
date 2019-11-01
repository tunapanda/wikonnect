const Model = require('./_model');
const knex = require('../db/db');

class Lesson extends Model {
  static get tableName() {
    return 'lessons';
  }

  static get relationMappings() {
    return {
      chapters: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'lessons.id',
          to: 'chapters.lesson_id'
        }
      }
    };
  }
}

Lesson.knex(knex);
module.exports = Lesson;
