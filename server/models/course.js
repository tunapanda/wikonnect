const Model = require('./_model');
const knex = require('../db/db');
const modelSchema = require('../db/json_schema/modelSchema');
const search = require('../utils/search');

class Course extends Model {
  static get tableName() {
    return 'courses';
  }

  static get jsonSchema() {
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

  async $afterInsert() {
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

  async $afterUpdate() {
    return search.update({
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

Course.knex(knex);
module.exports = Course;
