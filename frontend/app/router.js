import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signup');
  this.route('login');
  this.route('home');

  this.route('profile');
  this.route('search', { path: '/search/:id' });

  this.route('chapter', function () {
    this.route('index', {
      path: '/:chapter_slug'
    });
  });
  this.route('upload');
  this.route('manage');
  this.route('admin', function () {
    this.route('dashboard');
    this.route('accounts');
  });
  this.route('teach', function () {
    this.route('preview', { path: '/preview/:id' });
    this.route('tag', { path: '/tag/:id' });

    this.route('create');
    this.route('h5p-upload', { path: '/h5p-upload/:id' });
    this.route('thumbnail-upload', { path: '/thumbnail-upload/:id' });
    this.route('index', { path: '/' });


  });
  this.route('swagger');
  this.route('tag', { path: '/tag/:id' });
  this.route('embed', { path: '/embed/:chapter_id' });
  this.route('callback');
});
