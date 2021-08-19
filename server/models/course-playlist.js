const Model = require('./_model');
const knex = require('../db/db');


class CoursePlaylist extends Model {
  static get tableName() {
    return 'course_playlist';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        courseId: { type: 'string' },
        chapterId: { type: 'string' },
        rank: { type: 'string' },
        creatorId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['courseId', 'chapterId', 'rank', 'creatorId'],
    };
  }

  static get relationMappings() {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'course_playlist.courseId',
          to: 'courses.id'
        }
      },
      chapter: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'course_playlist.chapterId',
          to: 'chapters.id'
        }
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'course_playlist.userId',
          to: 'users.id'
        }
      }
    };
  }
}

CoursePlaylist.knex(knex);
module.exports = CoursePlaylist;
