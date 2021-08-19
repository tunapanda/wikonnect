const Model = require('./_model');
const knex = require('../db/db');
const search = require('../utils/search');

class Course extends Model {
  static get tableName() {
    return 'courses';
  }

  static get jsonSchema() {
    return  {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        metadata: { type: 'object' },
        creatorId: { type: 'string' },
        thumbnailUrl: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['name', 'description', 'slug', 'status', 'creatorId'],
    };
  }



  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'course';
  }

  static get relationMappings() {
    return {
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tag',
        join: {
          from: 'courses.id',
          through: {
            to: 'course_tags.tagId',
            from: 'course_tags.courseId'
          },
          to: 'tags.id'
        }
      },
      enrolledUsers: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'users.id',
          through: {
            to: 'course_enrollment.userId',
            from: 'course_enrollment.courseId',
            extra: {
              enrollmentId: 'id'
            }
          },
          to: 'courses.id'
        }
      },
      playlist:{
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'chapters.id',
          through: {
            to: 'course_playlist.chapterId',
            from: 'course_playlist.courseId',
            extra: ['rank']
          },
          to: 'courses.id'
        }
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'courses.creatorId',
          to: 'users.id'
        }
      },

      //following joins will be quicker on some instances e.g. getting count
      courseEnrollments:{
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/course-enrollment',
        join: {
          from: 'courses.id',
          to: 'course_enrollment.courseId'
        }
      },
    };
  }

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'courses',
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
        builder.select('courses.id', 'name');
      }
    };
  }
}

Course.knex(knex);
module.exports = Course;
