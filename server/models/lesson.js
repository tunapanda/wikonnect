const Model = require('./_model');
const knex = require('../db/db');
const modelSchema = require('../db/json_schema/modelSchema');

class Lesson extends Model {
  static get tableName() {
    return 'lessons';
  }

  static get jsonSchema() {
    return modelSchema;
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

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'name');
      }
    };
  }
}

Lesson.knex(knex);
module.exports = Lesson;
