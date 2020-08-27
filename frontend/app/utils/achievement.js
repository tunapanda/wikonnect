import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';


export default class AchievementEmberObject extends EmberObject.extend(Evented) {
  startUpload(url) {
    return new Promise(function (resolve, reject) {
      this.set('reject', reject);
      this.set('resolve', resolve);

      this._uploadData(url);
    }.bind(this));
  }

  _uploadData(urlOverride) {
    const xhr = new XMLHttpRequest();
    const url = this.get('uploadUrl') || urlOverride;

    xhr.open('post', url, true);

    xhr.withCredentials = this.get('withCredentials');

    let headers = {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest'
    };


    for (let headerName in headers) {
      headerValue = headers[headerName];
      xhr.setRequestHeader(headerName, headerValue);
    }

    xhr.send()
  }
}