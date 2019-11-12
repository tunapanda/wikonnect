import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signup');
  this.route('login');
  this.route('courses', { path: '/course/:id' }, function () {
    this.route('modules', { path: '/module/:id' }, function () {
      this.route('lessons', { path: '/lesson/:id' }, function () {
        this.route('chapters', { path: '/chapter/:id' });
      });
    });
  });
  this.route('profile', { path: '/profile/:id' }, function () {
    this.route('settings');
  });
  this.route('search');
  this.route('about');
});
