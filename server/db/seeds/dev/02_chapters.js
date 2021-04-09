const { faker, seed_number } = require('../_seeds');
const reviewQuestions = require('../../../utils/review-questions');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('lesson_chapters').del()
    .then(() => knex('chapters').del())
    .then(() => {
      return knex('users').pluck('id').then((userIds) => {
        const fakeChapters = [];
        const reviewQuestionsCategories = reviewQuestions.map((question) => question.category);
        for (let index = 0; index < seed_number; index++) {
          const name = faker.lorem.words();
          const slug = faker.helpers.slugify(name);
          const status = ['published', 'drafts', 'archived'];
          const tags = ['highschool', 'university', 'all', 'data', 'test'];
          const chapterId = ['chapter1', 'chapter2'];
          fakeChapters.push({
            name: name,
            slug: slug,
            description: faker.lorem.paragraph(),
            lesson_id: 'lesson1',
            content_type: 'h5p',
            status: faker.random.arrayElement(status),
            content_uri: `/uploads/h5p/${faker.random.arrayElement(chapterId)}`,
            creator_id: faker.random.arrayElement(userIds),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
            tags: faker.random.arrayElements(tags),
            approved: true,
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
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          approved: true,
          verified: true,
          tags: ['highschool', 'university'],
          review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
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
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          approved: true,
          verified: false,
          tags: ['highschool', 'university'],
          review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
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
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          tags: ['university'],
          approved: true,
          verified: false,
          review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
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
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          approved: true,
          verified: true,
          tags: ['highschool', 'university'],
          review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
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
          content_uri: '/uploads/h5p/chapter1',
          created_at: '2017-12-20 19:17:10',
          updated_at: '2017-12-20 19:17:10',
          approved: true,
          verified: false,
          tags: ['primary', 'university'],
          review_questions: faker.random.arrayElements(reviewQuestionsCategories, 4)
        });
        // Inserts seed entries
        return knex('chapters').insert(fakeChapters);
      });
    });
};
