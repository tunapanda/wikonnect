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
  this.route('course', { path: 'course/:course_id' }, function () {
    this.route('module', { path: 'module/:module_id' }, function () {
      this.route('lesson', { path: '/lesson/:lesson_id' }, function () {
        this.route('chapters', { path: '/chapter/:chapter_id' });
      });
    });
  });
  this.route('profile', { path: '/profile/:profile_id' }, function () {
    this.route('settings');
  });
  this.route('search');
  this.route('about');
});
