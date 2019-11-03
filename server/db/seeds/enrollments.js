
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('enrollments').del()
    .then(function () {
      return knex('enrollments').insert([
        {
          id: 'enrollment1',
          user_id: 'user1',
          course_id: 'course1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10'
        }
      ]);
    });
};
