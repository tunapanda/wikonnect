const Model = require('./_model');
const knex = require('../db/db');

class Review extends Model {

  static get tableName() {
    return 'reviews';
  }

  static get relationMappings() {
    return {
      rating: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/rating`,
        join: {
          from: 'reviews.ratingId',
          to: 'ratings.id',
        }
      }
    };
  }
}

Review.knex(knex);
module.exports = Review;