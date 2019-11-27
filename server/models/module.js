const Model = require('./_model');
const knex = require('../db/db');
const search = require('../utils/search');

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

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'module',
        name: this.name,
        description: this.description,
        status: this.status,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'name');
      }
    };
  }
}

Module.knex(knex);
module.exports = Module;
