const Router = require('koa-router');
const LearningPath = require('../models/learning_path');
const validatePostData = require('../middleware/validation/validatePostData');
const queryStringSearch = require('../middleware/queryStringSearch');
const permController = require('../middleware/permController');


const router = new Router({
  prefix: '/paths'
});

/**
 *
 * @param {database object} parent
 *
 * modify the parent object
 * return child relation object
 *
 */
async function returnType(parent) {
  try {
    if (parent.length == undefined) {
      parent.courses.forEach(lesson => {
        return lesson.type = 'courses';
      });
    } else {
      parent.forEach(mod => {
        mod.courses.forEach(lesson => {
          return lesson.type = 'courses';
        });
      });
    }
  } catch (error) {
    null;
  }
}

router.get('/', permController.grantAccess('readAny', 'path'), queryStringSearch, async ctx => {
  try {
    const learningpath = await LearningPath.query().where(ctx.query).eager('courses(selectNameAndId)');

    returnType(learningpath);
    const userPermissions = ctx.state.user.attributes;

    ctx.status = 200;
    ctx.body = { learningpath, userPermissions};
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.get('/:id', permController.grantAccess('readOwn', 'path'), async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id).eager('courses(selectNameAndId)');

  ctx.assert(learningpath, 404, 'No matching record found');

  returnType(learningpath);
  const userPermissions = ctx.state.user.attributes;

  ctx.status = 200;
  ctx.body = { learningpath, userPermissions};
});


router.post('/', permController.grantAccess('createAny', 'path'), validatePostData, async ctx => {
  let newLearningPath = ctx.request.body;

  const learningpath = await LearningPath.query().insertAndFetch(newLearningPath);

  ctx.assert(learningpath, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { learningpath };

});

router.put('/:id', permController.grantAccess('updateOwn', 'path'),  async ctx => {
  const learningpath_record = await LearningPath.query().findById(ctx.params.id);
  if (!learningpath_record) {
    ctx.throw(400, 'That learning path does not exist');
  }
  const learningpath = await LearningPath.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  ctx.assert(learningpath, 400, 'That learning path does not exist');

  ctx.status = 201;
  ctx.body = { learningpath };
});

router.delete('/:id', permController.grantAccess('deleteAny', 'path'), async ctx => {
  const learningpath = await LearningPath.query().findById(ctx.params.id);
  if (!learningpath) {
    ctx.assert(learningpath, 401, 'No ID was found');
  }
  await LearningPath.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { learningpath };
});

module.exports = router.routes();
