const env = process.env.NODE_ENV || 'test';
const knexfile = require('../../server/knexfile')[env];

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    'db:reset': async function () {
      // knexfile.debug = false;
      const db = require('knex')(knexfile);
      await db.migrate.rollback();
      await db.migrate.latest();
      const files = await db.seed.run();
      db.destroy();
      return files;
    }
  });
  
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  config.env.googleClientId = process.env.GOOGLE_KEY
  config.env.googleClientSecret = process.env.GOOGLE_SECRET

  return config
}
