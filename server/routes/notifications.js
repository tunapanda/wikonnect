const Router = require('koa-router');

const NotificationModel = require('../models/notification');
const {requireAuth} = require('../middleware/permController');


const router = new Router({
  prefix: '/notifications'
});

/**
 * @api {get} /api/v1/notifications/:id GET notification by Id
 * @apiName Get a notification by Id
 * @apiGroup Notifications
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization [Bearer << JWT here>>]
 *
 * @apiParam (URI Param) {String} id notification id
 *
 *
 * @apiSuccess {Object} notification Top level object
 * @apiSuccess {String} notification[id] notification id
 * @apiSuccess {String} notification[title] Title of the notification
 * @apiSuccess {String} notification[body] Body of the notification
 * @apiSuccess {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiSuccess {Object} [notification[itemId]] Optional Id of model record
 * @apiSuccess {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiSuccess {String}  notification[recipientId]  Id of the user being notified
 * @apiSuccess {Boolean} notification[read]  if user has read the notification
 * @apiSuccess {Object} [notification[metadata]]  Any metadata related to the notification
 * @apiSuccess {String} notification[createdAt] date created
 * @apiSuccess {String} notification[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "notification":{
 *                 "id": "I3ml3x-AAPE",
 *                 "title": "Your chapter has been approved",
 *                 "body": "Your recently published chapter has been approved!",
 *                 "itemId": "I3lchuEAA80",
 *                 "eventType": "chapter-approved",
 *                 "model": "chapter",
 *                 "recipientId": "user2",
 *                 "creatorId": "user1",
 *                 "read": false,
 *                 "metadata":{"sendEmail": true},
 *                 "createdAt": "2021-04-20T20:12:39.830Z",
 *                 "updatedAt": "2021-04-20T20:12:39.830Z"
 *                }
 *          }
 *
 */
router.get('/:id', requireAuth, async (ctx) => {
  let notification;

  try {
    notification=await NotificationModel.query()
      .findById(ctx.params.id);

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }

  ctx.assert(notification,404,{message:'Notification not found'});
  ctx.status = 200;
  ctx.body = {notification};
});

/**
 * @api {get} /api/v1/notifications GET all notifications
 * @apiName Get all notifications
 * @apiGroup Notifications
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization [Bearer << JWT here>>]
 *
 * @apiParam (Query Params) {Object} notification Top level object
 * @apiParam (Query Params) {String} notification[id] notification id
 * @apiParam (Query Params) {String} notification[title] Title of the notification
 * @apiParam (Query Params) {String} notification[body] Body of the notification
 * @apiParam (Query Params) {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiParam (Query Params) {Object} [notification[itemId]] Optional Id of model record
 * @apiParam (Query Params) {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiParam (Query Params) {String}  notification[recipientId]  Id of the user being notified
 * @apiParam (Query Params) {Boolean} notification[read]  if user has read the notification
 * @apiParam (Query Params) {Object} [notification[metadata]]  Any metadata related to the notification
 *
 *
 * @apiSuccess {Object} notification Top level object
 * @apiSuccess {String} notification[id] notification id
 * @apiSuccess {String} notification[title] Title of the notification
 * @apiSuccess {String} notification[body] Body of the notification
 * @apiSuccess {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiSuccess {Object} [notification[itemId]] Optional Id of model record
 * @apiSuccess {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiSuccess {String}  notification[recipientId]  Id of the user being notified
 * @apiSuccess {Boolean} notification[read]  if user has read the notification
 * @apiSuccess {Object} [notification[metadata]]  Any metadata related to the notification
 * @apiSuccess {String} notification[createdAt] date created
 * @apiSuccess {String} notification[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "notification":{
 *                 "id": "I3ml3x-AAPE",
 *                 "title": "Your chapter has been approved",
 *                 "body": "Your recently published chapter has been approved!",
 *                 "itemId": "I3lchuEAA80",
 *                 "eventType": "chapter-approved",
 *                 "model": "chapter",
 *                 "recipientId": "user2",
 *                 "creatorId": "user1",
 *                 "read": false,
 *                 "metadata":{"sendEmail": true},
 *                 "createdAt": "2021-04-20T20:12:39.830Z",
 *                 "updatedAt": "2021-04-20T20:12:39.830Z"
 *                }
 *          }
 *
 */
router.get('/', requireAuth, async (ctx) => {
  try {
    const notifications =  await NotificationModel.query()
      .where(ctx.query);
       
    ctx.status = 200;
    ctx.body = {notifications};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }
});

/**
 * @api {post} /api/v1/notifications POST a notification
 * @apiName Post a notification
 * @apiGroup Notifications
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Request Body) {Object} notification Top level object
 * @apiParam (Request Body) {String} notification[title] Title of the notification
 * @apiParam (Request Body) {String} notification[body] Body of the notification
 * @apiParam (Request Body) {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiParam (Request Body) {Object} [notification[itemId]] Optional Id of model record
 * @apiParam (Request Body) {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiParam (Request Body) {String}  notification[recipientId]  Id of the user being notified
 * @apiParam (Request Body) {Boolean} notification[read]  if user has read the notification
 * @apiParam (Request Body) {Object} [notification[metadata]]  Any metadata related to the notification
 *
 *
 * @apiSuccess {Object} notification Top level object
 * @apiSuccess {String} notification[id] notification id
 * @apiSuccess {String} notification[title] Title of the notification
 * @apiSuccess {String} notification[body] Body of the notification
 * @apiSuccess {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiSuccess {Object} [notification[itemId]] Optional Id of model record
 * @apiSuccess {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiSuccess {String}  notification[recipientId]  Id of the user being notified
 * @apiSuccess {Boolean} notification[read]  if user has read the notification
 * @apiSuccess {Object} [notification[metadata]]  Any metadata related to the notification
 * @apiSuccess {String} notification[createdAt] date created
 * @apiSuccess {String} notification[updatedAt] date updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *          {
 *             "notifications":[{
 *                 "id": "I3ml3x-AAPE",
 *                 "title": "Your chapter has been approved",
 *                 "body": "Your recently published chapter has been approved!",
 *                 "itemId": "I3lchuEAA80",
 *                 "eventType": "chapter-approved",
 *                 "model": "chapter",
 *                 "recipientId": "user2",
 *                 "creatorId": "user1",
 *                 "read": false,
 *                 "metadata":{"sendEmail": true},
 *                 "createdAt": "2021-04-20T20:12:39.830Z",
 *                 "updatedAt": "2021-04-20T20:12:39.830Z"
 *                }]
 *          }
 *
 *
 */
router.post('/', requireAuth, async ctx => {

  const obj = ctx.request.body.notification;
  const creatorId = ctx.state.user.data.id;

  try {
    const notification = await NotificationModel.query()
      .insertAndFetch({...obj, creatorId});


    ctx.status = 201;
    ctx.body = {notification};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
  }

});

/**
 * @api {put} /api/v1/notification PUT a notification
 * @apiName PUT a notification by Id
 * @apiGroup Notifications
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Notification Id to update
 *
 * @apiParam (Request Body) {Object} notification Top level object
 * @apiParam (Request Body) {String} [notification[title]] Title of the notification
 * @apiParam (Request Body) {String} [notification[body]] Body of the notification
 * @apiParam (Request Body) {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiParam (Request Body) {Object} [notification[itemId]] Optional Id of model record
 * @apiParam (Request Body) {String} [notification[eventType]] Type of event. Can be used to resolve related notification model.
 * @apiParam (Request Body) {String}  [notification[recipientId]]  Id of the user being notified
 * @apiParam (Request Body) {Boolean} [notification[read]]  if user has read the notification
 * @apiParam (Request Body) {Object} [notification[metadata]]  Any metadata related to the notification
 *
 *
 * @apiSuccess {Object} notification Top level object
 * @apiSuccess {String} notification[id] notification id
 * @apiSuccess {String} notification[title] Title of the notification
 * @apiSuccess {String} notification[body] Body of the notification
 * @apiSuccess {Object} [notification[model]] Optional model name related to notification (refer to Wikonnect/frontend/app/models)
 * @apiSuccess {Object} [notification[itemId]] Optional Id of model record
 * @apiSuccess {String} notification[eventType] Type of event. Can be used to resolve related notification model.
 * @apiSuccess {String}  notification[recipientId]  Id of the user being notified
 * @apiSuccess {Boolean} notification[read]  if user has read the notification
 * @apiSuccess {Object} [notification[metadata]]  Any metadata related to the notification
 * @apiSuccess {String} notification[createdAt] Date record was created
 * @apiSuccess {String} notification[updatedAt] Date record was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "notification":{
 *                 "id": "I3ml3x-AAPE",
 *                 "title": "You have a new chapter comment",
 *                 "body": "Your recently approved chapter has received a comment!",
 *                 "itemId": "I3lchuEAA80",
 *                 "eventType": "chapter-comment",
 *                 "model": "chapter",
 *                 "recipientId": "user2",
 *                 "creatorId": "user1",
 *                 "read": false,
 *                 "metadata":{"sendEmail": false},
 *                 "createdAt": "2021-04-20T20:12:39.830Z",
 *                 "updatedAt": "2021-04-20T20:12:39.830Z"
 *                }
 *          }
 *
 */
router.put('/:id', requireAuth, async ctx => {
  let obj = ctx.request.body.notification;
  delete obj.id;
  
  const currentNotification = await NotificationModel.query()
    .findById(ctx.params.id);
  ctx.assert(currentNotification, 404, 'Notification does not exist');

  try {
    const notification = await currentNotification.$query()
      .patchAndFetch(obj);
  
    ctx.status = 200;
    ctx.body = {notification};

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  }
});

/**
 * @api {delete} /api/v1/notification/:id Delete a notification
 * @apiName DELETE a notification by Id
 * @apiGroup Notifications
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the notification to delete
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const notification = await NotificationModel.query()
    .findById(ctx.params.id);

  ctx.assert(notification,404, 'No notification with that Id exist');

  try {
    await  notification.$query().delete();

    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: ['Bad Request']});
    }
  }
});


module.exports = router.routes();