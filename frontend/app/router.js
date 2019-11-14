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
    this.route('courses', function () {
        this.route('course', { path: '/:course_id' }, function () {
            this.route('modules', function () {
                this.route('module', { path: 'module/:module_id' }, function () {
                    this.route('modules/lessons/lesson', { path: '/lesson/:lesson_id' }, function () {
                        this.route('chapters', { path: '/chapter/:id' });
                    });
                });
            });
        });
    });
    this.route('profile', { path: '/profile/:id' }, function () {
        this.route('settings');
    });
    this.route('search');
    this.route('about');
});
