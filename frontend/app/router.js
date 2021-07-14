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

  this.route('learn', function () {
    this.route('chapters');
    this.route('courses', function () {
      this.route('available');
      this.route('enrolled');
    });
  });

  this.route('profile', { path: '/profile/:id' }, function () {
    this.route('home');
    this.route('achievements');
    this.route('courses', function () {
      this.route('enrolled', { path: '/enrolled/@me' });
      this.route('available');
    });
    this.route('people');
    this.route('tags');
  });

  this.route('account', { path: '/profile' }, function () {
    this.route('edit');
  });

  this.route('chapter', function () {
    this.route('index', {
      path: '/:chapter_slug',
    });
  });
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

  this.route('admin', function () {
    this.route('dashboard', { path: '/' });
    this.route('users');
    this.route('badges', function () {
      this.route('home', { path: '/' });
      this.route('manage');
    });
  });

  this.route('course', function () {
    this.route('index');
    this.route('show', { path: '/:id/show' });
    this.route('edit', { path: '/:id/edit' });
    this.route('create');
    this.route('published');
    this.route('drafts');
  });

  // 404 page should always be the last
  this.route('not-found', { path: '*path' });
  this.route('access-denied');
});
