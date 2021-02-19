const Model = require('./_model');
const knex = require('../db/db');
const commentSchema = require('../db/json_schema/commentSchema');

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
    return commentSchema;
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