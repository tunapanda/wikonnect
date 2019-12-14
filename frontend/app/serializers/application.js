import RESTSerializer from '@ember-data/serializer/rest';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends RESTSerializer {
  keyForRelationship(key, relationship) {
    if (relationship === 'belongsTo') {
      return `${underscore(key)}Id`;
    }
    return key;
  }
}