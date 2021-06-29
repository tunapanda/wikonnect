const { raw } = require('objection');
const Model = require('./_model');
const knex = require('../db/db');
const Trigger = require('./badge_triggers');
const Badges = require('./badges');
const UserBadges = require('./user_badges');

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
        relation: Model.ManyToManyRelation,
        modelClass: Comment,
        join: {
          from: 'comments.id',
          through: {
            from: 'parent_child_comments.parentId',
            to: 'parent_child_comments.childId'
          },
          to: 'comments.id'
        }
      },
      children: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'comments.id',
          to: 'comments.parentId'
        }
      },
      parent: {
        relation: Model.ManyToManyRelation,
        modelClass: Comment,
        join: {
          from: 'comments.id',
          through: {
            from: 'parent_child_comments.childId',
            to: 'parent_child_comments.parentId'
          },
          to: 'comments.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      selectComment: (builder) => {
        builder.select('id', 'creator_id', 'chapter_id', 'comment', 'createdAt', 'updatedAt');
      }
    };
  }

  async $afterInsert(queryContext) {
    await super.$afterInsert(queryContext);
    // get total
    const results = await Comment.query(queryContext.transaction)
      .select([
        raw('COUNT(CASE WHEN parent_id =\'false\' THEN 1 ELSE NULL END) as "totalcomments"'),
        raw('COUNT(CASE WHEN parent_id <> \'false\' THEN 1 ELSE NULL END) as "totalreplies"')
      ])
      .where('creator_id', this.creatorId);

    const trigger = await Trigger.query().where({ name: 'comment_create' }).returning('id');

    if (results[0].totalcomments > 1) {
      const badges = await Badges.query().where('trigger_id', trigger[0].id);
      await UserBadges.query().insert({ 'user_id': this.creatorId, 'badge_id': badges[0].id }).returning(['user_id']);
    }

    if (results[0].totalreplies > 3) {
      const badges = await Badges.query().where('trigger_id', trigger[0].id);
      await UserBadges.query().insert({ 'user_id': this.creatorId, 'badge_id': badges[0].id }).returning(['user_id']);
    }
  }
}

Comment.knex(knex);
module.exports = Comment;
