exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reactions').insert([
        { id: 1, reaction: 'like', user_id: 'user1', chapter_id: 'chapter1' },
        { id: 3, reaction: 'like', user_id: 'user2', chapter_id: 'chapter1' },
        { id: 5, reaction: 'like', user_id: 'user3', chapter_id: 'chapter1' },
        { id: 7, reaction: 'dislike', user_id: 'user4', chapter_id: 'chapter1' },
        { id: 4, reaction: 'dislike', user_id: 'user2', chapter_id: 'chapter2' },
        { id: 2, reaction: 'dislike', user_id: 'user1', chapter_id: 'chapter2' },
        { id: 6, reaction: 'dislike', user_id: 'user3', chapter_id: 'chapter2' }
      ]);
    });
};