const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('course_enrollment').del();

  const userIds = await knex('users').pluck('id');
  const courseIds = await knex('courses').pluck('id');

  let courseEnrollment = [];

  for (let i = 0; i < seed_number; i++) {
    const { user_id, course_id } = generateUnique();
    courseEnrollment.push({
      user_id,
      course_id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const userId = faker.random.arrayElement(userIds);
    const courseId = faker.random.arrayElement(courseIds);
    const index = courseEnrollment.findIndex((c) => c.course_id === courseId && c.user_id === userId);

    if (index > -1) {
      return generateUnique();
    }
    return { user_id: userId, course_id: courseId };
  }
  // Inserts seed entries
  return knex('course_enrollment').insert(courseEnrollment);
};
