'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'wikonnect',
    environment,
    rootURL: '/',
    locationType: 'auto',
    proxyUrl:
      process.argv.indexOf('--proxy') > -1
        ? process.argv[process.argv.indexOf('--proxy') + 1]
        : '',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_MODULE_UNIFICATION: true
        EMBER_METAL_TRACKED_PROPERTIES: true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      instance_name: 'Wikonnect',
      header_logo: '/images/logo.png',
      header_background: 'orange',
      teach_header_background: 'green',
      header_text: 'light',
      primary_color: 'orange',
      embeded_h5p_editor: false,
      linkify_description: false,
      use_preset_tags: false,
      moja_integration: false,
      languages: [
        { name: 'English', code: 'EN', file: 'en-us' },
        { name: 'Swahili', code: 'SW', file: 'sw-ke' },
      ],
      preset_tags: [
        { category: 'KICD', tags: ['KICD ALIGNED', 'KICD APPROVED'] },
        { category: 'Competency', tags: ['TEST', 'TEST2'] },
      ],
    },

    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      authenticationRoute: 'login',
    },

    'ember-simple-auth-token': {
      refreshTokenPropertyName: 'token',
      serverTokenEndpoint: '/api/v1/auth',
      serverTokenRefreshEndpoint: '/api/v1/auth/token-refresh',
    },
    'ember-drag-drop-polyfill': {
      enableEnterLeave: true,
      holdToDrag: false,
    },

    google: {
      apiKey: process.env.GOOGLE_KEY,
    },

    torii: {
      allowUnsafeRedirects: true,
      providers: {
        'facebook-oauth2': {
          apiKey: process.env.FACEBOOK_KEY,
          scope: 'email',
        },
        'github-oauth2': {
          apiKey: process.env.GITHUB_CLIENT_ID,
          redirectUri: process.env.GITHUB_REDIRECT_URI,
          scope: 'repo user:email',
        },
        'linked-in-oauth2': {
          apiKey: process.env.LINKEDIN_CLIENT_ID,
          redirectUri: process.env.LINKEDIN_REDIRECT_URI,
          scope: 'r_liteprofile r_emailaddress',
        },
      },
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/],
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  // ENV.settings = settings

  return ENV;
};
