
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        { chapter_id: 'chapter1', comment: 'chapter1', creator_id: 'user1' },
        { chapter_id: 'chapter1', comment: 'chapter1', creator_id: 'user1' },
        { chapter_id: 'chapter2', comment: 'chapter2', creator_id: 'user2' },
        { chapter_id: 'chapter2', comment: 'chapter2', creator_id: 'user3' }
      ]);
    });
};
