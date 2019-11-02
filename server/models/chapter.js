const Model = require('./_model');
const knex = require('../db/db');

class Chapter extends Model {
  static get tableName() {
    return 'chapters';
  }

  static get relationMappings() {
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/lesson',
        join: {
          from: 'chapters.lesson_id',
          to: 'lessons.id'
        }
      }
    };
  }
}

Chapter.knex(knex);
module.exports = Chapter;
