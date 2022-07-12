import ApplicationAdapter from './application';

export default class XapiAdapter extends ApplicationAdapter {
  pathForType() {
    return 'xapi';
  }
}