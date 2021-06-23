const Model = require('./_model');
const knex = require('../db/db');
const search = require('../utils/search');

class Tag extends Model {
  static get tableName() {
    return 'tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        canDelete: { type: 'boolean' },
        creatorId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
      required: ['name', 'slug', 'creatorId'],
    };
  }
  static get virtualAttributes() {
    return ['type'];
  }

  type() {
    return 'tag';
  }

  static get relationMappings() {
    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/course',
        join: {
          from: 'courses.id',
          through: {
            to: 'course_tags.course_id',
            from: 'course_tags.tag_id'
          },
          to: 'tags.id'
        }
      },
      chapters: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/chapter',
        join: {
          from: 'chapters.id',
          through: {
            to: 'chapter_tags.chapter_id',
            from: 'chapter_tags.tag_id'
          },
          to: 'tags.id'
        }
      },
      followers: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'tags.id',
          through: {
            from: 'tag_followers.tag_id',
            to: 'tag_followers.user_id',
            extra: {
              subscriptionId: 'id'
            }
          },
          to: 'users.id'
        }
      },

      //following joins will be quicker on some instances e.g. getting count
      courseTags: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/course-tag',
        join: {
          from: 'tags.id',
          to: 'course_tags.tag_id'
        }
      },
      chapterTags: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/chapter-tag',
        join: {
          from: 'tags.id',
          to: 'chapter_tags.tag_id'
        }
      },
      tagFollowers: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/tag-follower',
        join: {
          from: 'tags.id',
          to: 'tag_followers.tag_id'
        },
      },

    };
  }

  async $indexForSearch() {
    return search.index({
      index: search.indexName,
      id: this.id,
      body: {
        model: 'tag',
        name: this.name,
        slug: this.slug,
        can_delete: this.canDelete,
        creator_id: this.creatorId,
        created_at: this.createdAt,
        modified_at: this.modifiedAt
      }
    });
  }

}

Tag.knex(knex);
module.exports = Tag;
