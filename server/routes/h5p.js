const fs = require('fs');

const Router = require('koa-router');
const {H5PAjaxEndpoint} = require('@lumieducation/h5p-server');
const busboy = require('async-busboy');

const {requireAuth} = require('../middleware/permController');
const H5PEditor = require('../utils/h5p/editor');
const {H5PPlayer} = require('../utils/h5p/player');
const {H5PUser} = require('../utils/h5p/config');
const {Exporter} = require('../utils/h5p/download');
const log = require('../utils/logger');


const router = new Router({
  prefix: '/h5p'
});


/**
 * Get H5P Editor model for specific existing H5P content (assets & integration settings)
 *
 */

router.get('/editor/:contentId', requireAuth, async (ctx) => {
  try {

    const {contentId} = ctx.params;
    const {language} = ctx.query;
    const user = H5PUser(ctx.state.user);

    const editor = await H5PEditor();
    const model = await editor.render(contentId, language, user);
    const content = await editor.getContent(contentId, user);

    ctx.status = 200;
    ctx.body = {
      model: {...model, metadata: content.h5p, library: content.library, params: content.params.params}
    };
  } catch (e) {
    log.error(e);
    ctx.status = 500;
    ctx.body = {error: e};
  }
});

/**
 * Get H5P Editor model (assets & integration settings)
 *
 */
router.get('/editor', requireAuth, async (ctx) => {
  try {
    const {language} = ctx.query;
    const user = H5PUser(ctx.state.user);

    const editor = await H5PEditor();

    ctx.status = 200;
    ctx.body = {model: await editor.render(undefined, language, user)};
  } catch (e) {
    log.error(e);
    ctx.status = 500;
    ctx.body = {error: e};
  }
});

/**
 * Handle all H5P Editor & Player GET AJAX requests
 *
 */
router.get('/ajax', requireAuth, async (ctx) => {
  try {
    const {action, majorVersion, minorVersion, machineName, language} = ctx.query;
    const editor = await H5PEditor();
    const user = H5PUser(ctx.state.user);

    const result = await new H5PAjaxEndpoint(editor)
      .getAjax(action, machineName, majorVersion, minorVersion, language, user);

    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {error: e.message};
  }

});

/**
 * Handle all H5P Editor POST AJAX requests
 *
 */
router.post('/ajax', requireAuth, async (ctx) => {
  try {
    const {action, id, language} = ctx.query;
    const user = H5PUser(ctx.state.user);
    const editor = await H5PEditor();
    let body = ctx.request.body;

    let uploadedLibraryFile = undefined;
    let uploadedContentFile = undefined;

    if (ctx.request.is('multipart/*')) {
      const {files, fields} = await busboy(ctx.req);
      body = fields;

      if (files && files.length > 0) {
        const {mimeType, filename, path, fieldname} = files[0];

        const fileMetadata = {
          mimetype: mimeType, name: filename,
          size: fs.statSync(path).size, tempFilePath: path,
        };

        if (fieldname.toLowerCase().trim() === 'h5p') {
          uploadedLibraryFile = fileMetadata;
        }
        if (fieldname.toLowerCase().trim() === 'file') {
          uploadedContentFile = fileMetadata;
        }
      }
    }

    const translator = null; //should be a function (stringId: string, replacements: )=>string

    const result = await new H5PAjaxEndpoint(editor)
      .postAjax(action, body, language, user, uploadedContentFile, id, translator, uploadedLibraryFile);

    ctx.status = action === 'libraries' || action === 'translations' || action === 'filter' ? 200 : 201;
    ctx.body = result;

  } catch (e) {
    log.error(e);
    ctx.status = 400;
    ctx.body = {error: e.message};
  }
});

/**
 * Get specified user content by ID
 *
 */
router.get('/content/:contentId', requireAuth, async (ctx) => {
  try {
    const contentId = ctx.params.contentId;

    const user = H5PUser(ctx.state.user);
    const editor = await H5PEditor();

    //fetch existing content by ID
    const {title, language, license} = await editor.contentManager.getContentMetadata(contentId, user);


    ctx.status = 200;
    ctx.body = {id: contentId, title, language, license};

  } catch (e) {
    ctx.status = 400;
    ctx.body = {error: e.message || e};
  }
});

/**
 * Get all user created content
 */
router.get('/content', requireAuth, async (ctx) => {
  try {

    const user = H5PUser(ctx.state.user);
    const editor = await H5PEditor();

    const contendIds = await editor.contentManager.listContent(user); //get current user content


    const results = await Promise.all(contendIds.map(async (id) => {
      const {title, language, license} = await editor.contentManager.getContentMetadata(id, user);
      return {id, title, language, license};
    }));

    ctx.status = 200;
    ctx.body = {data: results};

  } catch (e) {
    ctx.status = 400;
    ctx.body = {error: e.message || e};
  }
});

/**
 * Persist user created content
 *
 */
router.put('/content', requireAuth, async (ctx) => {
  try {

    const {contentId, library, params} = ctx.request.body;
    if (!params.params || !params.metadata || !library) {
      throw 'Malformed request';
    }

    const user = H5PUser(ctx.state.user);
    const editor = await H5PEditor();

    const result = await editor
      .saveOrUpdateContentReturnMetaData(contentId || undefined, params.params, params.metadata, library, user);

    ctx.status = 200;
    ctx.body = result;

  } catch (e) {
    ctx.status = 400;
    ctx.body = {error: e.message || e};
  }
});

/**
 * Delete existing content
 */
router.delete('/content/:contentId', requireAuth, async (ctx) => {
  try {

    const contentId = ctx.params.contentId;

    const user = H5PUser(ctx.state.user);
    const editor = await H5PEditor();

    await editor.contentManager.deleteContent(contentId, user);

    ctx.status = 204;

  } catch (e) {
    ctx.status = 400;
    ctx.body = {error: e.message || e};
  }
});


/**
 * Download H5P content as zipped .h5p file
 *
 */
router.get('/download/:contentId', async (ctx) => {
  try {

    const {contentId} = ctx.params;
    const user = H5PUser(ctx.state.user);

    const editor = await H5PEditor();

    const results = await new Exporter(editor)
      .getPackageStream(contentId, user);

    ctx.status = 200;
    ctx.response.attachment(`${contentId}.h5p`);
    ctx.body = results;

  } catch (e) {
    log.error(e);
    ctx.status = 400;
    ctx.body = {error: e};
  }
});


router.get('/contentUserData', async (ctx) => {

  ctx.status = 204;
  ctx.body = {};
});

router.post('/contentUserData', async (ctx) => {

  ctx.status = 204;
  ctx.body = {};
});

/**
 * Get H5P Player model for specific existing H5P content (assets & integration settings)
 *
 */

router.get('/player/:contentId', async (ctx) => {
  try {
    const {contentId} = ctx.params;
    const editor = await H5PEditor();
    const user = H5PUser(ctx.state.user);

    const player = await H5PPlayer(editor);

    const results = await player.render(contentId, user);

    ctx.status = 200;
    ctx.body = {model: results};

  } catch (e) {
    log.error(e);
    ctx.status = 400;
    ctx.body = {error: e};
  }

});


module.exports = router.routes();
