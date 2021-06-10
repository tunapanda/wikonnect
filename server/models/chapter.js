const { raw } = require('objection');

const Model = require('./_model');
const knex = require('../db/db');
const chapterSchema = require('../db/json_schema/chapterSchema');
const search = require('../utils/search');
const {SHooksEventEmitter} = require('../utils/event-emitter');
const {events} = require('../utils/storage-hooks-events');

class Chapter extends Model {
  static get tableName() {
    return 'chapters';
  }

  static get jsonSchema() {
    return chapterSchema;
  }

  static get relationMappings() {
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/lesson',
        join: {
          from: 'chapters.lesson_id',
          to: 'lessons.id'
        }
      },
      comment: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/comment',
        join: {
          from: 'chapters.id',
          to: 'comments.chapterId'
        }
      },
      flag: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/flag',
        join: {
          from: 'chapters.id',
          to: 'flags.chapterId'
        }
      },
      achievement: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/achievement',
        join: {
          from: 'chapters.id',
          to: 'achievements.target'
        }
      },
      rating: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/rating',
        join: {
          from: 'chapters.id',
          to: 'ratings.chapterId'
        }
      },
      reaction: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/reaction',
        join: {
          from: 'chapters.id',
          to: 'reactions.chapterId'
        }
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'chapters.creatorId',
          to: 'users.id'
        }
      }
    };
  }

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'chapter',
        name: this.name,
        description: this.description,
        content: '',
        tags: this.tags,
        status: this.status,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }

  static get modifiers() {
    return {
      selectNameAndId: (builder) => {
        builder.select('id', 'name');
      }
    };
  }

  static async afterUpdate(args) {
    await super.afterUpdate(args);

    const {  context ,asFindQuery} =args;

    if(SHooksEventEmitter.listenerCount(events.user.chapter.countOnUpdate)>0) {
      const rows = await asFindQuery().select('creatorId');
      for (let i = 0; i < rows.length; i++) {

        // get totals
        const results = await this.query(context.transaction)
          .select([
            raw('COUNT(CASE WHEN "approved" = true THEN 1 ELSE NULL END) AS totalApproved'),
            raw('COUNT(CASE WHEN "status" = \'published\' THEN 1 ELSE NULL END) AS totalPublished')
          ])
          .where('creator_id', rows[i].creatorId);

        SHooksEventEmitter.emit(events.user.chapter.countOnUpdate, {
          totalApproved: results[0].totalapproved,
          totalPublished: results[0].totalpublished,
          creatorId: rows[i].creatorId
        });
      }
    }
  }
}

Chapter.knex(knex);
module.exports = Chapter;
