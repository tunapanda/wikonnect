const Model = require('./_model');
const knex = require('../db/db');

class ChapterTag extends Model {
  static get tableName() {
    return 'chapter_tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        chapterId: { type: 'string' },
        tagId: { type: 'string' },
        creatorId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['chapterId', 'tagId'],
    };
  }

  static get relationMappings() {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'chapter_tags.chapter_id',
          to: 'chapters.id'
        }
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/tag',
        join: {
          from: 'chapter_tags.tag_id',
          to: 'tags.id'
        }
      },

    };
  }

}

ChapterTag.knex(knex);
module.exports = ChapterTag;
