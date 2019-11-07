const Model = require('./_model');
const knex = require('../db/db');
const chapterSchema = require('../db/json_schema/chapterSchema');

class Chapter extends Model {
  static get tableName() {
    return 'chapters';
  }

  static get jsonSchema(){
    return chapterSchema;
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
