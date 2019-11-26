const Model = require('./_model');
const knex = require('../db/db');
const modelSchema = require('../db/json_schema/modelSchema');
const search = require('../utils/search');

class LearningPath extends Model {
  static get tableName() {
    return 'learning_paths';
  }

  static get jsonSchema() {
    return modelSchema;
  }

  static get relationMappings() {
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'learning_paths.id',
          through: {
            from: 'learning_path_courses.learning_path_id',
            to: 'learning_path_courses.course_id'
          },
          to: 'courses.id'
        }
      }
    };
  }

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'learning_path',
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

LearningPath.knex(knex);
module.exports = LearningPath;
