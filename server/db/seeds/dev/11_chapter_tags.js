const { faker, seed_number } = require('../_seeds');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('chapter_tags').del();

  const userIds = await knex('users').pluck('id');
  const chapterIds = await knex('chapters').pluck('id');
  const tagIds = await knex('tags').pluck('id');

  let chapterTags = [];

  for (let i = 0; i < seed_number; i++) {
    const { chapter_id, tag_id } = generateUnique();
    chapterTags.push({
      chapter_id,
      tag_id,
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }

  function generateUnique() {
    const tagId = faker.random.arrayElement(tagIds);
    const chapterId = faker.random.arrayElement(chapterIds);
    const index = chapterTags.findIndex((c) => c.tag_id === tagId && c.chapter_id === chapterId);
    if (index > -1) {
      return generateUnique();
    }
    return { tag_id: tagId, chapter_id: chapterId };
  }
  // Inserts seed entries
  return knex('chapter_tags').insert(chapterTags);
};
