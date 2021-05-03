import EmberRouter from '@ember/routing/router';
import config from 'wikonnect/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signup');
  this.route('login');
  this.route('about');

  this.route('profile');
  this.route('search', { path: '/search/:id' });

  this.route('chapter', function () {
    this.route('index', {
      path: '/:chapter_slug',
    });
  });
  this.route('upload');
  this.route('manage');

  this.route('teach', function () {
    this.route('preview', { path: '/preview/:id' });
    this.route('tag', { path: '/tag/:id' });

    this.route('create');
    this.route('h5p-upload', { path: '/h5p-upload/:id' });
    this.route('thumbnail-upload', { path: '/thumbnail-upload/:id' });
    this.route('index', { path: '/' });
    this.route('published');
    this.route('edit', { path: '/edit/:chapter_id' });
    this.route('h5p-editor', { path: '/h5p-editor/:id' });
    this.route('login');
    this.route('review-questions', { path: 'review-questions/:id' });
  });
  this.route('embed', { path: '/embed/:chapter_id' });
  this.route('callback');

  this.route('forgot_password');
  this.route('reset_password');
  this.route('verify');
  // 404 page should always be the last
  this.route('not-found', { path: '*path' });
});
