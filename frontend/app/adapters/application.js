import RESTAdapter from 'ember-data/adapters/rest';
import { inject } from "@ember/service";


export default class ApplicationEmberObject {
  namespace = 'api/v1'

  coalesceFindRequests = true
}