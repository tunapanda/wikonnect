import ApplicationAdapter from './application';
import { pluralize } from 'ember-inflector';
import { dasherize } from '@ember/string';

export default class CourseEnrollmentAdapter extends ApplicationAdapter {
  pathForType(model) {
    return pluralize(dasherize(model));
  }
}
