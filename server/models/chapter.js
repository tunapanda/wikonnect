const Model = require('./_model');
const knex = require('../db/db');
const chapterSchema = require('../db/json_schema/chapterSchema');
const search = require('../utils/search');

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
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/tag',
        join: {
          from: 'chapters.id',
          through: {
            to: 'chapter_tags.tag_id',
            from: 'chapter_tags.chapter_id'
          },
          to: 'tags.id'
        }
      },
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
}

Chapter.knex(knex);
module.exports = Chapter;
