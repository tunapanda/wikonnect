import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { run } from '@ember/runloop';


export default class UploaderEmberObject extends EmberObject.extend(Evented) {
  attempts = 0;
  started = false;
  finished = false;
  uploading = false;
  error = false;
  progress = 0;

  startUpload(url) {
    return new Promise(function (resolve, reject) {
      this.set('reject', reject);
      this.set('resolve', resolve);

      this._uploadFile(url);
    }.bind(this));
  }

  reset() {
    this.setProperties({
      started: false,
      finished: false,
      uploading: false,
      error: false,
      progress: 0
    });
  }

  _uploadFile(urlOveride) {
    const xhr = new XMLHttpRequest();
    const url = this.get('uploadUrl') || urlOveride;

    xhr.open('post', url, true);

    xhr.withCredentials = !!this.get('withCredentials');

    let headers = {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest'
    };

    if (this.get('auth')) {
      headers.Authorization = this.get('auth');
    }

    let headerValue;

    for (let headerName in headers) {
      headerValue = headers[headerName];
      xhr.setRequestHeader(headerName, headerValue);
    }

    const formData = new FormData();

    const file = this.get('file');

    formData.append('file', file, file.name);

    this.setProperties({
      'status': 'sending',
      'started': true,
      'finished': false,
      'uploading': true
    });

    xhr.onload = () => run(() => this._onFinish());
    xhr.upload.onprogress = (e) => run(() => this._onProgress(e));
    xhr.upload.onerror = (e) => run(() => this._onError(e));

    xhr.send(formData);

    this.set('xhr', xhr);
  }

  _onProgress(e) {
    if (e) {
      let progress = Math.ceil(100 * e.loaded / e.total);
      this.set('progress', progress);
      this.trigger('progress', progress);
    }
  }

  _onFinish() {
    const xhr = this.get('xhr');

    if (xhr.readyState !== 4) {
      return this._onError('Network Error');
    }

    if (xhr.status > 203) {
      return this._onError('Server Error');
    }

    let response;

    if (xhr.getResponseHeader('Content-Type').indexOf('json') > 0) {
      try {
        response = JSON.parse(xhr.responseText);
      } catch (err) {
        return this._onError('Unexpected server response.');
      }
    }

    this.setProperties({
      'progress': 100,
      'status': 'finished',
      'finished': true,
      'uploading': false
    });

    this.get('resolve')(response);
    this.trigger('finish', response);
  }

  _onError(err) {
    let msg = err;
    if (typeof err !== 'string') {
      switch (this.get('xhr').status) {
      case 404:
        msg = 'File not found';
        break;
      case 500:
        msg = 'Server error';
        break;
      case 0:
        msg = 'Request aborted';
        break;
      default:
        msg = 'Unknown error ' + this.get('xhr').status;
      }
    }

    if (this.get('attempts') < 3 && msg !== 'Request aborted') {
      this.incrementProperty('attempts');
      this.reset();
      return this._uploadFile();
    }

    this.setProperties({
      status: 'error',
      uploading: false,
      error: true
    });

    this.get('reject')();
  }
}
