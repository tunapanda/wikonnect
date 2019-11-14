import Route from '@ember/routing/route';

export default class CoursesIndexRoute extends Route {

    model(params) {
        return this.store.findRecord('course', params.course_id);
    }
}
