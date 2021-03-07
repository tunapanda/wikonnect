import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { run } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class UploaderEmberObject extends EmberObject.extend(Evented) {
  @tracked reject;
  @tracked resolve;
  @tracked xhr;
  @tracked progress = 0;

  attempts = 0;
  started = false;
  finished = false;
  uploading = false;
  error = false;

  startUpload(url) {
    return new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
      this._uploadFile(url);
    });
  }

  reset() {
    this.started = false;
    this.finished = false;
    this.uploading = false;
    this.error = false;
    this.progress = 0;
  }

  _uploadFile(urlOveride) {
    const xhr = new XMLHttpRequest();
    const url = this.uploadUrl || urlOveride;

    xhr.open('post', url, true);

    xhr.withCredentials = !!this.withCredentials;

    let headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (this.auth) {
      headers.Authorization = this.auth;
    }

    let headerValue;

    for (let headerName in headers) {
      headerValue = headers[headerName];
      xhr.setRequestHeader(headerName, headerValue);
    }

    const formData = new FormData();

    const file = this.file;

    formData.append('file', file, file.name);

    this.status = 'sending';
    this.started = true;
    this.finished = false;
    this.uploading = true;

    xhr.onload = () => run(() => this._onFinish());
    xhr.upload.onprogress = (e) => run(() => this._onProgress(e));
    xhr.upload.onerror = (e) => run(() => this._onError(e));

    xhr.send(formData);

    this.xhr = xhr;
  }

  _onProgress(e) {
    if (e) {
      let progress = Math.ceil((100 * e.loaded) / e.total);
      this.progress = progress;
      this.trigger('progress', progress);
    }
  }

  _onFinish() {
    const xhr = this.xhr;

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

    this.progress = 100;
    this.status = 'finished';
    this.finished = true;
    this.uploading = false;

    this.resolve(response);
    this.trigger('finish', response);
  }

  _onError(err) {
    let msg = err;
    if (typeof err !== 'string') {
      switch (this.xhr.status) {
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
          msg = 'Unknown error ' + this.xhr.status;
      }
    }

    if (this.attempts < 3 && msg !== 'Request aborted') {
      ++this.attempts;
      this.reset();
      return this._uploadFile();
    }

    this.status = 'error';
    this.uploading = false;
    this.error = true;

    this.reject();
  }
}
