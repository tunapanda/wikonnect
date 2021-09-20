import Service from '@ember/service';

export default class LocalStoreService extends Service {

  constructor() {
    super(...arguments);
    this.store = window.localStorage;
  }

  save(data, key='theme'){
    this.store.setItem(key, JSON.stringify(data));
  }

  getData(key='theme'){
    return JSON.parse(this.store.getItem(key));
  }

  remove(key='theme') {
    this.store.removeItem(key);
  }

}