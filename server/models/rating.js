const Model = require('./_model');

class Rating extends Model {
  static get tableName() {
    return 'ratings';
  }

  static  get relationMappings(){
    return {
      review:{
        relation: Model.BelongsToOneRelation,
        modelClass:`${__dirname}/review`,
        join: {
          to: 'ratings.id',
          from: 'reviews.ratingId'
        }
      }
    };
  }

}

module.exports = Rating;
