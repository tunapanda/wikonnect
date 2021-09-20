import Service from '@ember/service';

export default class LocalStoreService extends Service {

  constructor() {
    super(...arguments);
    this.store = window.localStorage;
    console.log("LocalStore service - loaded");
  }

  save(data, key='gists'){
    this.store.setItem(key, JSON.stringify(data));
  }

  getData(key='gists'){
    return JSON.parse(this.store.getItem(key));
  }

  remove(key='gists') {
    this.store.removeItem(key);
  }

}