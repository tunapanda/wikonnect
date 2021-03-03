const Model = require('./_model');
const knex = require('../db/db');

class Comment extends Model {
  static get tableName() {
    return 'comments';
  }

  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'comment';
  }

  static get jsonSchema() {
    return {
      'type': 'object',
      'properties': {
        'id': { 'type': 'string' },
        'chapterId': { 'type': 'string' },
        'creatorId': { 'type': 'string' },
        'comment': { 'type': 'string' }
      },
      'required': ['chapterId', 'creatorId', 'comment'],
    };
  }

  static get relationMappings() {
    return {
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'comments.id',
          to: 'comments.parentId',
        },
      },
    };
  }

  static get modifiers() {
    return {
      selectComment: (builder) => {
        builder.select('id', 'creator_id', 'chapter_id', 'comment', 'createdAt', 'updatedAt');
      }
    };
  }
}

Comment.knex(knex);
module.exports = Comment;



// "id": "It4DF0EAAB0",
// "chapterId": "chapter1",
// "creatorId": "user1",
// "comment": "chapter1",
// "metadata": null,
// "createdAt": null,
// "updatedAt": null,