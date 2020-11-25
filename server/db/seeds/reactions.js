
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reactions').insert([
        { id: 1, reaction: 'like', userId: 'user1', chapterId: 'chapter1' },
        { id: 2, reaction: 'dislike', userId: 'user1', chapterId: 'chapter2' },
        { id: 3, reaction: 'like', userId: 'user2', chapterId: 'chapter1' },
        { id: 4, reaction: 'dislike', userId: 'user2', chapterId: 'chapter2' },
        { id: 5, reaction: 'like', userId: 'user3', chapterId: 'chapter1' },
        { id: 6, reaction: 'dislike', userId: 'user3', chapterId: 'chapter2' },
        { id: 7, reaction: 'dislike', userId: 'user4', chapterId: 'chapter1' },
      ]);
    });
};
