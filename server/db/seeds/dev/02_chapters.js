const {faker, seed_number} = require('../_seeds');
const reviewQuestions = require('../../../utils/review-questions');
const {seedH5PFiles} = require( '../../../h5p-dummy/unzip-dummy-h5p');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('lesson_chapters').del();
  await knex('chapters').del();
  const userIds = await knex('users').pluck('id');
  const fakeChapters = [];
  const reviewQuestionsCategories = reviewQuestions.map((question) => question.category);
  let contentId = null;
  if(!process.env.NODE_ENV || process.env.NODE_ENV ==='development'){
    contentId = 'demo-chapter';
    await seedH5PFiles(contentId);
  }
  for (let index = 0; index < seed_number; index++) {
    const name = faker.lorem.words();
    const slug = faker.helpers.slugify(name);
    const status = ['published', 'draft', 'archived'];

    fakeChapters.push({
      name: name,
      slug: slug,
      description: faker.lorem.paragraph(),
      lesson_id: 'lesson1',
      content_type: 'h5p',
      image_url: faker.image.imageUrl(328, 200, 'business', true, false),
      status: faker.random.arrayElement(status),
      content_id: contentId,
      creator_id: faker.random.arrayElement(userIds),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      approved: faker.datatype.boolean(),
      verified: faker.datatype.boolean(),
      review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
    });
  }
  fakeChapters.push({
    id: 'chapter1',
    name: 'A Chapter',
    slug: 'a-chapter',
    description: 'An H5P Chapter.',
    status: 'published',
    lesson_id: 'lesson1',
    creator_id: 'user1',
    content_type: 'h5p', 
    content_id: contentId,
    created_at: '2017-12-20 19:17:10',
    updated_at: '2017-12-20 19:17:10',
    approved: true,
    verified: true,
  },
  {
    id: 'chapter2',
    name: 'Kelley',
    slug: 'Elisa',
    description: 'consectetur',
    creator_id: 'user1',
    status: 'published',
    lesson_id: 'basics1',
    content_type: 'h5p',
    content_id: contentId,
    created_at: '2017-12-20 19:17:10',
    updated_at: '2017-12-20 19:17:10',
    approved: true,
    verified: false,
  },
  {
    id: 'chapter3',
    name: 'Ethel',
    slug: 'Tonya',
    description: 'cupidatat',
    creator_id: 'user1',
    status: 'published',
    lesson_id: 'basics2',
    content_type: 'h5p',
    content_id: contentId,
    created_at: '2017-12-20 19:17:10',
    updated_at: '2017-12-20 19:17:10',
    approved: true,
    verified: false,
  },
  {
    id: 'chapter4',
    name: 'Montoya',
    slug: 'Myra',
    description: 'qui',
    status: 'published',
    creator_id: 'user1',
    lesson_id: 'basics2',
    content_type: 'h5p',
    content_id: contentId,
    created_at: '2017-12-20 19:17:10',
    updated_at: '2017-12-20 19:17:10',
    approved: true,
    verified: true,
  },
  {
    id: 'chapter5',
    name: 'Montoya',
    slug: 'Myra',
    creator_id: 'user1',
    description: 'qui',
    status: 'published',
    lesson_id: 'basics2',
    content_type: 'h5p',
    content_id: contentId,
    created_at: '2017-12-20 19:17:10',
    updated_at: '2017-12-20 19:17:10',
    approved: true,
    verified: false,
  });
  
  // Inserts seed entries
  return knex('chapters').insert(fakeChapters);
};
