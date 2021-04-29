const { ref } = require('objection');

const {faker, seed_number} = require('../_seeds');
const questions = require('../../../utils/review-questions');
const Chapter = require('../../../models/chapter');
const Reaction = require('../../../models/reaction');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('ratings').del();

  // we only need the reacted chapters
  const reactions = await Reaction.query()
    .select(['reaction','chapterId','userId'])
    .whereIn('chapter_id',
      Chapter.query()
        .select(['id'])
        .andWhere('id', ref('reactions.chapterId'))
    );


  const ratings = [];
  const categories = questions.map((d) => d.category);
  const selectedReactions=[];

  for (let index = 0; index < seed_number; index++) {
    let totalRating = 0;

    const metadata = faker.random.arrayElements(categories, 3).reduce((acc, category) => {
      acc[category] = Math.floor(Math.random() * Math.floor(5));
      totalRating += acc[category];
      return acc;
    }, {});
    const averageRating = totalRating / categories.length;

    const reaction = faker.random.arrayElement(reactions);

    //we will use the below trick to ensure only one active rating exist
    const ratingExist = selectedReactions.findIndex((pred)=>{
      return  pred.chapterId ===reaction.chapterId && pred.userId ===reaction.userId;
    } ) >-1;

    selectedReactions.push(reaction);
    ratings.push({
      chapter_id: reaction.chapterId,
      user_id: reaction.userId,
      average_rating: averageRating,
      reaction:reaction.reaction,
      metadata,
      is_deleted: ratingExist,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  // Inserts seed entries
  return knex('ratings').insert(ratings);

};
