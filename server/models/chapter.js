const Model = require('./_model');
const knex = require('../db/db');
const chapterSchema = require('../db/json_schema/chapterSchema');
const search = require('../utils/search');

class Chapter extends Model {
  static get tableName() {
    return 'chapters';
  }

  static get jsonSchema() {
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

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'course',
        name: this.name,
        description: this.description,
        content: '',
        status: this.status,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }
}

Chapter.knex(knex);
module.exports = Chapter;
