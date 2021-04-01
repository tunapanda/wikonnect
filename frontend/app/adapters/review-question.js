import ApplicationAdapter from './application';
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default class ReviewQuestionAdapter extends ApplicationAdapter {
  pathForType(model) {
    return pluralize(dasherize(model));
  }
}
