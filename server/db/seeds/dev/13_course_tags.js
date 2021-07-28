const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('course_tags').del();

  const userIds = await knex('users').pluck('id');
  const courseIds = await knex('courses').pluck('id');
  const tagIds = await knex('tags').pluck('id');

  let courseTags = [];

  for (let i = 0; i < seed_number; i++) {
    const { course_id, tag_id } = generateUnique();
    courseTags.push({
      course_id,
      tag_id,
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const tagId = faker.random.arrayElement(tagIds);
    const courseId = faker.random.arrayElement(courseIds);
    const index = courseTags.findIndex((c) => c.tag_id === tagId && c.course_id === courseId);
    if (index > -1) {
      return generateUnique();
    }
    return { tag_id: tagId, course_id: courseId };
  }
  // Inserts seed entries
  return knex('course_tags').insert(courseTags);
};
