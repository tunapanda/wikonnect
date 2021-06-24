import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  serialize() {
    let json = super.serialize(...arguments);
    delete json.profileUri;

    return json;
  }
}
