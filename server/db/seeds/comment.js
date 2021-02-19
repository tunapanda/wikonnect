
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return knex('comments').insert([
        { id: '1', chapter_id: 'chapter1', parent_id: 'null', comment: 'chapter1', creator_id: 'user1' },
        { id: '2', chapter_id: 'chapter1', parent_id: '1', comment: 'chapter1', creator_id: 'user1' },
        { id: '3', chapter_id: 'chapter2', parent_id: '1', comment: 'chapter2', creator_id: 'user2' },
        { id: '4', chapter_id: 'chapter2', parent_id: 'null', comment: 'chapter2', creator_id: 'user3' },
        { id: '5', chapter_id: 'chapter1', parent_id: '4', comment: 'chapter1', creator_id: 'user1' },
        { id: '6', chapter_id: 'chapter1', parent_id: '4', comment: 'chapter1', creator_id: 'user1' },
        { id: '7', chapter_id: 'chapter2', parent_id: '4', comment: 'chapter2', creator_id: 'user2' },
        { id: '8', chapter_id: 'chapter2', parent_id: '4', comment: 'chapter2', creator_id: 'user3' }
      ]);
    });
};
