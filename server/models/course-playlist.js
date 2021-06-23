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
          from: 'course_playlist.course_id',
          to: 'courses.id'
        }
      },
      chapter: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'course_playlist.chapter_id',
          to: 'chapters.id'
        }
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'course_playlist.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

CoursePlaylist.knex(knex);
module.exports = CoursePlaylist;
