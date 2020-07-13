
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('dashboard').del()
    .then(() => knex('targets').del())
    .then(function () {
      // Inserts seed entries
      return knex('dashboard').insert([
        {
          id: 1,
          key_result: 'kr1',
          achieved: 30,
          quarter: 'q1 2020'
        },
        {
          id: 2,
          key_result: 'kr1',
          achieved: 38,
          quarter: 'q2 2020'
        },
        {
          id: 3,
          key_result: 'kr1',
          achieved: 40,
          quarter: 'q3 2020'
        },
        {
          id: 4,
          key_result: 'kr1',
          achieved: 40,
          quarter: 'q4 2020'
        }
      ]);
    })
    .then(() => knex('targets').insert([
      {
        id: 1,
        key_result: 'kr1',
        target: 90
      }
    ]));
};
