const Model = require('./_model');

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

module.exports = Review;