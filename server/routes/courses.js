const Router = require('koa-router');
const Course = require('../models/course');
const validatePostData = require('../middleware/validation/validatePostData');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);


const router = new Router({
  prefix: '/courses'
});

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.modules.forEach(lesson => {
      return lesson.type = 'modules';
    });
  } else {
    parent.forEach(mod => {
      mod.modules.forEach(lesson => {
        return lesson.type = 'modules';
      });
    });
  }
}

async function insertType(model, collection, course_id) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    let data = {
      'learning_path_id': element,
      'course_id': course_id
    };
    await knex(model).insert(data);
  }
}


router.get('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  if (!course) {
    ctx.assert(course, 404, 'no lesson by that ID');
  }
  returnType(course);

  ctx.status = 200;
  ctx.body = { course };
});

router.get('/', async ctx => {
  try {
    const course = await Course.query().where(ctx.query).eager('modules(selectNameAndId)');
    returnType(course);

    ctx.status = 200;
    ctx.body = { course };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.post('/', validatePostData, async ctx => {
  let { learning_path_id, ...newCourse } = ctx.request.body.courses;
  const course = await Course.query().insertAndFetch(newCourse);

  insertType('learning_path_courses', learning_path_id, course.id);

  ctx.assert(course, 401, 'Something went wrong');
  ctx.status = 201;
  ctx.body = { newCourse };
});

router.put('/:id', async ctx => {
  let { learning_path_id, ...newCourse } = ctx.request.body.courses;
  const course = await Course.query().patchAndFetchById(ctx.params.id, newCourse);

  ctx.assert(course, 400, 'That course does not exist');

  const rookie = await knex('learning_path_courses').where('courses_id', course.id);

  if (!learning_path_id == undefined) {
    let put_data = [];
    for (let index = 0; index < learning_path_id.length; index++) {
      put_data.push(learning_path_id[index]);
    }

    for (let index = 0; index < rookie.length; index++) {
      const rook = rookie[index].module_id;
      if (rook != put_data[index]) {
        await knex('learning_path_courses').where({ 'courses_id': course.id, 'module_id': rook }).del();
        await knex('learning_path_courses').insert({ 'courses_id': course.id, 'module_id': put_data[index] });
      }
    }
  }

  ctx.status = 201;
  ctx.body = { course };
});
router.delete('/:id', async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });

  ctx.assert(course, 401, 'No ID was found');
  ctx.status = 200;
  ctx.body = { course };
});

module.exports = router.routes();
