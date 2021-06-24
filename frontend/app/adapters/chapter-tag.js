import ApplicationAdapter from './application';
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default class ChapterTagAdapter extends ApplicationAdapter {
  pathForType(model) {
    return pluralize(dasherize(model));
  }
}
