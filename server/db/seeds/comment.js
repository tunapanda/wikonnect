
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        { id: 1, chapterId: 'chapter1', comment: 'chapter1', creatorId: 'user1' },
        { id: 2, chapterId: 'chapter1', comment: 'chapter1', creatorId: 'user1' },
        { id: 3, chapterId: 'chapter2', comment: 'chapter2', creatorId: 'user2' },
        { id: 4, chapterId: 'chapter2', comment: 'chapter2', creatorId: 'user3' }
      ]);
    });
};
