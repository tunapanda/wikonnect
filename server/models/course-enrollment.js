const Model = require('./_model');
const knex = require('../db/db');

class CourseEnrollment extends Model {
  static get tableName() {
    return 'course_enrollment';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        courseId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['courseId', 'userId'],
    };
  }

  static get relationMappings() {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/course',
        join: {
          to: 'course_enrollment.course_id',
          from: 'courses.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          user: 'course_enrollment.user_id',
          from: 'users.id'
        }
      }
    };
  }
}

CourseEnrollment.knex(knex);
module.exports = CourseEnrollment;
