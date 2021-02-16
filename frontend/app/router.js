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

  this.route('course', function () {
    this.route('index', {
      path: '/:course_slug'
    });

    this.route('module', function () {
      this.route('index', {
        path: '/:module_slug'
      });

      this.route('lesson', function () {
        this.route('index', {
          path: '/:lesson_slug'
        });

        this.route('chapter', function () {
          this.route('index', {
            path: '/:chapter_slug'
          });
        });
      });

      this.route('edit', {
        path: '/edit/:module_slug'
      });
    });
    this.route('create');

    this.route('edit', {
      path: '/edit/:course_slug'
    });
  });

  this.route('profile');
  this.route('search', { path: '/search/:id' });
  this.route('about');

  this.route('cms', function () {
    this.route('lesson', function () {
      this.route('create');

      this.route('edit', {
        path: '/:lesson_slug'
      });
    });

    this.route('course', function () {
      this.route('create');
      this.route('edit', {
        path: '/:course_slug'
      });
    });

    this.route('module', function () {
      this.route('edit', {
        path: '/:module_slug'
      });
      this.route('create');
    });
  });

  this.route('module', function () {
    this.route('create');
    this.route('index', {
      path: '/:module_slug'
    });
  });
  this.route('courses');
  this.route('cms-desktop');
  this.route('lesson', function () {
    this.route('index', {
      path: '/:lesson_slug'
    });
  });
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
  this.route('topics');
  this.route('tags');
  this.route('tag', { path: '/tag/:id' });
  this.route('embed', { path: '/embed/:chapter_id' });
  this.route('callback');
});
