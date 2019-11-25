const Model = require('./_model');
const knex = require('../db/db');
const search = require('../utils/search');

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


  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'course',
        name: this.name,
        description: this.description,
        status: this.status,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }
}

Lesson.knex(knex);
module.exports = Lesson;
