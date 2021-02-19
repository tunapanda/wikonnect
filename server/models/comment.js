const Model = require('./_model');
const knex = require('../db/db');
const commentSchema = require('../db/json_schema/commentSchema');

class Comment extends Model {
  static get tableName() {
    return 'comments';
  }

  static get jsonSchema() {
    return commentSchema;
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
        builder.select('id', 'creator_id', 'chapter_id', 'comment');
      }
    };
  }
}

Comment.knex(knex);
module.exports = Comment;
