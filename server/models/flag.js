const Model = require('./_model');
const knex = require('../db/db');
// const search = require('../utils/search');

class Flag extends Model {
  static get tableName() {
    return 'flags';
  }

  // async $indexForSearch() {
  //   return search.index({
  //     index: search.indexName,
  //     id: this.id,
  //     body: {
  //       model: 'flag',
  //       comment: this.comment,
  //       description: this.description,
  //       status: this.status,
  //       created_at: this.createdAt,
  //       modified_at: this.modifiedAt
  //     }
  //   });
  // }

  static get modifiers() {
    return {
      selectFlag: (builder) => {
        builder.select('id', 'user_id', 'chapter_id', 'comment');
      }
    };
  }
}

Flag.knex(knex);
module.exports = Flag;
