const Model = require('./_model');
const knex = require('../db/db');

class CourseTag extends Model {
  static get tableName() {
    return 'course_tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        courseId: { type: 'string' },
        tagId: { type: 'string' },
        creatorId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['courseId', 'tagId'],
    };
  }

  static get relationMappings() {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'course_tags.course_id',
          to: 'courses.id'
        }
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tag',
        join: {
          from: 'course_tags.tag_id',
          to: 'tags.id'
        }
      },

    };
  }

}

CourseTag.knex(knex);
module.exports = CourseTag;
