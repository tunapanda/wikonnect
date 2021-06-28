const Joi = require('joi');

const getQuerySchema = Joi.object({
  id: Joi.string(),
  slug: Joi.string(),
  creatorId: Joi.string(),
  name: Joi.string(),
  canDelete: Joi.boolean(),
  chapterTagsOnly: Joi.boolean(),
  courseTagsOnly: Joi.boolean(),
  includeAggregates: Joi.boolean(),
  page: Joi.number(),
  per_page: Joi.number(),
}).nand('chapterTagsOnly', 'courseTagsOnly')
  .messages({
    'object.nand': 'chapterTagsOnly query must not exist simultaneously with courseTagsOnly param'
  });

exports.TagsQueryValidation = async (ctx, next) => {
  try {
    ctx.query = await getQuerySchema.validateAsync(ctx.query);
    await next();

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }
};


const postQuerySchema = Joi.object({
  tag: Joi.object({
    creatorId: Joi.string().valid(null),
    name: Joi.string().required(),
    slug: Joi.string().valid(null),
  }).required()
});

exports.TagPostValidation = async (ctx, next) => {
  try {
    ctx.request.body = await postQuerySchema.validateAsync(ctx.request.body);
    await next();

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }
};

exports.TagPutValidation = async (ctx, next) => {
  try {
    ctx.request.body = await postQuerySchema.validateAsync(ctx.request.body);
    await next();

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else {
      ctx.throw(400, null, {errors: [e.message]});
    }
    throw e;
  }
};

