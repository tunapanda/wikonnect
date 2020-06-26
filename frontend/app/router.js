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
  this.route('search');
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
  this.route('reward', function () {
    this.route('moja');
  });
  this.route('dashboard');
  this.route('admin', function () {
    this.route('accounts');
  });
});
