const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
// const getUserByUsername = require('../middleware/authenticate');
const permController = require('../middleware/permController');
const jwt = require('../middleware/jwt');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/users'
});


async function returnType(parent) {
  try {
    if (parent.length == undefined) {
      parent.achievementAwards.forEach(lesson => {
        return lesson.type = 'achievementAwards';
      });
    } else {
      parent.forEach(mod => {
        mod.achievementAwards.forEach(lesson => {
          return lesson.type = 'achievementAwards';
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function enrolledCoursesType(parent) {
  try {
    if (parent.length == undefined) {
      parent.enrolledCourses.forEach(lesson => {
        return lesson.type = 'course';
      });
    } else {
      parent.forEach(mod => {
        mod.enrolledCourses.forEach(lesson => {
          return lesson.type = 'course';
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}


async function createPasswordHash(ctx, next) {
  if (ctx.request.body.user.password) {
    const hash = await bcrypt.hash(ctx.request.body.user.password, 10);

    delete ctx.request.body.user.password;
    ctx.request.body.user.hash = hash;
  }
  await next();
}

// router.post('/', validateAuthRoutes.validateNewUser, getUserByUsername, createPasswordHash, async ctx => {
router.post('/', validateAuthRoutes.validateNewUser, createPasswordHash, async ctx => {
  ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();
  ctx.request.body.user.email = ctx.request.body.user.email.toLowerCase();



  const newUser = ctx.request.body.user;
  const firstUserCheck = await User.query();
  let role = !firstUserCheck.length ? 'groupSuperAdmin' : 'groupBasic';

  try {
    const user = await User.query().insertAndFetch(newUser);
    await knex('group_members').insert({ 'user_id': user.id, 'group_id': role });
    ctx.status = 201;
    ctx.body = { user };
  } catch (e) {
    if (e.status === 503) {
      e.headers = Object.assign({}, e.headers, { 'Retry-After': 30 });
    } else {
      ctx.throw(400, {
        errors: [{
          'id': e.code,
          'status': 400,
          'code': e.code,
          'title': e.name,
          'detail': e.constraint,
          'hint': e.hint,
          'source': {
            'pointer': e.constraint,
            'parameter': e.detail
          }
        }]
      });
    }
    throw e;
  }
});

router.get('/:id', permController.requireAuth, async ctx => {

  const user = await User.query().findById(ctx.params.id).mergeJoinEager('[achievementAwards(selectBadgeNameAndId), userRoles(selectName), enrolledCourses(selectNameAndId)]');
  returnType(user);
  enrolledCoursesType(user);


  if (!user) {
    ctx.throw(404, 'No User With that Id');
  }

  if (user.id !== ctx.state.user.data.id) {
    ctx.throw(401, 'You do not have permissions to view that user');
  }

  // get all verification data
  const userVerification = await knex('user_verification').where({ 'user_id': ctx.params.id });
  user.userVerification = userVerification;

  ctx.status = 200;
  ctx.body = { user };

});
router.get('/', permController.requireAuth, permController.grantAccess('readAny', 'profile'), async ctx => {
  let user = User.query();

  if (ctx.query.username) {
    user.where('username', ctx.query.username);
    ctx.assert(user, 404, 'No User With that username');
  }
  try {
    user = await user.mergeJoinEager('[achievementAwards(selectBadgeNameAndId), userRoles(selectName), enrolledCourses(selectNameAndId)]');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(406, null, { errors: [e.message] }); }
    throw e;
  }

  enrolledCoursesType(user);
  returnType(user);

  ctx.body = { user };
});

router.put('/:id', jwt.authenticate, permController.grantAccess('updateOwn', 'profile'), async ctx => {
  const user = await User.query().patchAndFetchById(ctx.params.id, ctx.request.body.user);
  ctx.assert(user, 404, 'That user does not exist.');

  ctx.status = 200;
  ctx.body = { user };

});

module.exports = router.routes();