const knex = require('knex');
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
    'db:reset': function () {
      const db = require('knex')(knexfile);
      // console.log('rolling back db');
      return db.migrate.rollback()
        .then(() => {
          // console.log('rolling forward db');
          return db.migrate.latest();
        })
        .then(() => {
          // console.log('seeding db');
          return db.seed.run();
        }).then((files) => {
          // console.log('seed files:');
          // console.log(files);
          db.destroy();
          return files;
        });
    }
  });
}
