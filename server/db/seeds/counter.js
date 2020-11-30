
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('counter').del()
    .then(function () {
      // Inserts seed entries
      return knex('counter').insert([
        { id: 1, trigger: 'chapterCompletion', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 2, trigger: 'chapterCompletion', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 3, trigger: 'chapterCompletion', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 4, trigger: 'timerDelay', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10'},
        { id: 5, trigger: 'timerDelay', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10'},
        { id: 6, trigger: 'timerDelay', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10'},
        { id: 7, trigger: 'pageLanding', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10'},
        { id: 8, trigger: 'pageLanding', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 9, trigger: 'pageLanding', chapter_id: 'chapter1', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 10, trigger: 'chapterCompletion', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 11, trigger: 'pageLanding', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 12, trigger: 'chapterCompletion', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 13, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 14, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 15, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 16, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 17, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
        { id: 18, trigger: 'timerDelay', chapter_id: 'chapter2', counter: 3, created_at: '2017-12-20 19:17:10', updated_at: '2017-12-20 19:17:10' },
      ]);
    });
};
