const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('course_playlist').del();

  const courseIds = await knex('courses').pluck('id');
  const chapterIds = await knex('chapters').pluck('id');

  let playlist = [];

  for (let i = 0; i < seed_number; i++) {
    const { course_id, chapter_id } = generateUnique();
    playlist.push({
      course_id,
      chapter_id,
      rank: i,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const chapterId = faker.random.arrayElement(chapterIds);
    const courseId = faker.random.arrayElement(courseIds);
    const index = playlist.findIndex((c) => c.course_id === courseId && c.chapter_id === chapterId);

    if (index > -1) {
      return generateUnique();
    }
    return { chapter_id: chapterId, course_id: courseId };
  }
  // Inserts seed entries
  return knex('course_playlist').insert(playlist);
};
