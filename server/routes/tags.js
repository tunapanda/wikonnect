const Router = require('koa-router');
const { UniqueViolationError } = require('objection');
const TagModel = require('../models/tag');
const { requireAuth } = require('../middleware/permController');
const slugify = require('../utils/slugGen');


const router = new Router({
  prefix: '/tags'
});

/**
 * @api {get} /api/v1/tags/:id GET tag by Id
 * @apiName Get a tag by Id
 * @apiGroup Tags
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} [Authorization] Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id tag id
 *
 *
 * @apiSuccess {Object}  tag Top level object
 * @apiSuccess {String}  tag[name] the name of the tag
 * @apiSuccess {String}  tag[slug] user friendly tag url pathname
 * @apiSuccess {String}  tag[creatorId] Id of the user who created the tag
 * @apiSuccess {Boolean} tag[canDelete] If any user has permissions to delete the tag
 * @apiSuccess {String}  tag[createdAt] date tag was created
 * @apiSuccess {String}  tag[updatedAt] date tag was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tag":{
 *                "id": "JBaHWpeAAGQ",
 *                "name": "Internet Basics",
 *                "slug": "internet-basics",
 *                "creatorId": "user2",
 *                "canDelete": false,
 *                "createdAt": "2020-08-29T10:29:31.047Z",
 *                "updatedAt": "2021-06-19T20:49:06.797Z"
 *                }
 *          }
 *
 */
router.get('/:id', requireAuth, async (ctx) => {
  const tag = await TagModel.query()
    .findById(ctx.params.id);

  ctx.assert(tag, 404, { message: 'Tag not found' });
  ctx.status = 200;
  ctx.body = { tag };
});

/**
 * @api {get} /api/v1/tags GET all tags
 * @apiName Get all tags
 * @apiGroup Tags
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} [Authorization] Bearer << JWT here>>
 *
 * @apiParam (Query Params) {String}   [id] specified tag id to filter with
 * @apiParam (Query Params) {String}   [name]  specified tag name to filter with
 * @apiParam (Query Params) {String}   [slug]  filter with user friendly tag url pathname
 * @apiParam (Query Params) {Boolean}  [canDelete]  filter with tags that can/not be deleted
 * @apiParam (Query Params) {String}   [creatorId]  filter tags by tag author Id
 * @apiParam (Query Params) {Boolean}  [includeAggregates=false] if to add courses, chapters, & followers counts on response
 *
 *
 * @apiSuccess {Object}  tags Top level object
 * @apiSuccess {String}  tag[id] tag id
 * @apiSuccess {String}  tag[name] the name of the tag
 * @apiSuccess {String}  tag[slug] user friendly tag url pathname
 * @apiSuccess {String}  tag[creatorId] Id of the user who created the tag
 * @apiSuccess {Boolean} tag[canDelete] If any user has permissions to delete the tag
 * @apiSuccess {String}  tag[createdAt] date tag was created
 * @apiSuccess {String}  tag[updatedAt] date tag was updated
 * @apiSuccess {String}  [tag[coursesCount]] total courses tied to the tag
 * @apiSuccess {String}  [tag[chaptersCount]] total chapters tied to the tag
 * @apiSuccess {String}  [tag[followersCount]] total users following the tag

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tags":[
 *                {
 *                   "id": "JBaHWpeAAGQ",
 *                   "name": "Internet Basics",
 *                   "slug": "internet-basics",
 *                   "creatorId": "user2",
 *                   "canDelete": false,
 *                   "createdAt": "2020-08-29T10:29:31.047Z",
 *                   "updatedAt": "2021-06-19T20:49:06.797Z",
 *                   "coursesCount": "4",
 *                   "chaptersCount": "1",
 *                   "followersCount": "2"
 *                }]
 *          }
 *
 */
router.get('/', requireAuth, async (ctx) => {
  let tags;
  const includeAggregates = ctx.query.includeAggregates;
  delete ctx.query.includeAggregates;

  if (includeAggregates === true || includeAggregates === 1 || includeAggregates === 'true' || includeAggregates === '1') {
    tags = await TagModel.query()
      .select(['*',
        TagModel.relatedQuery('courseTags').count().as('coursesCount'),
        TagModel.relatedQuery('chapterTags').count().as('chaptersCount'),
        TagModel.relatedQuery('followers').count().as('followersCount'),
      ])
      .where(ctx.query);
  } else {
    tags = await TagModel.query()
      .where(ctx.query);
  }

  ctx.status = 200;
  ctx.body = { tags };
});

/**
 * @api {post} /api/v1/tags POST a tag
 * @apiName Post a tag
 * @apiGroup Tags
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Request Body) {Object}  tag Top level object
 * @apiParam (Request Body)  {String} tag[name] the name of the tag
 *
 * @apiSuccess {Object}  tag Top level object
 * @apiSuccess {String}  tag[id] tag id
 * @apiSuccess {String}  tag[name] the name of the tag
 * @apiSuccess {String}  tag[slug] user friendly tag url pathname
 * @apiSuccess {String}  tag[creatorId] Id of the user who created the tag
 * @apiSuccess {Boolean} tag[canDelete] If any user has permissions to delete the tag
 * @apiSuccess {String}  tag[createdAt] date tag was created
 * @apiSuccess {String}  tag[updatedAt] date tag was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tag":{
 *                "id": "JBaHWpeAAGQ",
 *                "name": "Internet Basics",
 *                "slug": "internet-basics",
 *                "creatorId": "user2",
 *                "canDelete": false,
 *                "createdAt": "2020-08-29T10:29:31.047Z",
 *                "updatedAt": "2021-06-19T20:49:06.797Z"
 *                }
 *          }
 */
router.post('/', requireAuth, async ctx => {

  try {
    const obj = ctx.request.body.tag;
    const creatorId = ctx.state.user.data.id;
    obj.slug = await slugify(obj.name);

    const tag = await TagModel.query()
      .insertAndFetch({ ...obj, creatorId, canDelete: true });

    ctx.status = 201;
    ctx.body = { tag };
  } catch (e) {
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['Tag name already exist'] });
    }
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {put} /api/v1/tags PUT a tag
 * @apiName PUT a tag by Id
 * @apiGroup Tags
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the tag to update
 *
 * @apiParam (Request Body) {Object}  tag Top level object
 * @apiParam (Request Body)  {String} tag[name] the name of the tag
 *
 * @apiSuccess {Object}  tag Top level object
 * @apiSuccess {String}  tag[id] tag id
 * @apiSuccess {String}  tag[name] the name of the tag
 * @apiSuccess {String}  tag[slug] user friendly tag url pathname
 * @apiSuccess {String}  tag[creatorId] Id of the user who created the tag
 * @apiSuccess {Boolean} tag[canDelete] If any user has permissions to delete the tag
 * @apiSuccess {String}  tag[createdAt] date tag was created
 * @apiSuccess {String}  tag[updatedAt] date tag was updated
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "tag":{
 *                "id": "JBaHWpeAAGQ",
 *                "name": "Internet Basics",
 *                "slug": "internet-basics",
 *                "creatorId": "user2",
 *                "canDelete": false,
 *                "createdAt": "2020-08-29T10:29:31.047Z",
 *                "updatedAt": "2021-06-19T20:49:06.797Z"
 *                }
 *          }
 */
router.put('/:id', requireAuth, async ctx => {
  let obj = ctx.request.body.tag;
  delete obj.id;

  const oldTag = await TagModel.query()
    .findById(ctx.params.id);
  ctx.assert(oldTag, 404, 'Tag does not exist');

  obj.slug = await slugify(obj.name);

  const tag = await oldTag.$query()
    .patchAndFetch(obj);

  ctx.status = 200;
  ctx.body = { tag };

});

/**
 * @api {delete} /api/v1/tags/:id Delete a tag
 * @apiName DELETE a tag by Id
 * @apiGroup Tags
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the tag to delete
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const tag = await TagModel.query()
    .findById(ctx.params.id);

  ctx.assert(tag, 404, 'No tag with that Id exist');

  await tag.$query().delete();

  ctx.status = 200;
  ctx.body = {};

});


module.exports = router.routes();
