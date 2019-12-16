import Uploader from './uploader';


export default class ImageUploaderEmberObject extends Uploader {
  // startUpload: function() {
  //   this._generateThumbnail();
  // },
  generateThumbnail() {
    console.log('generating thumbnail');
    this.set('loading', true);
    let file = this.get('file');
    let fileReader = new FileReader();
    let img = new Image();

    let loadImage = new Promise((resolve) => {
      fileReader.addEventListener('load', () => resolve());
      fileReader.readAsDataURL(file);
    }).then(() => {
      console.log('file read');
      return new Promise((resolve, reject) => {
        img.addEventListener('load', () => resolve());
        try {
          img.src = fileReader.result;
        } catch (err) {
          reject(err);
        }
      });
    });

    return loadImage.then(() => {
      console.log('img loaded');

      this.set('width', img.width);
      this.set('height', img.height);

      let resizeInfo = this._resizeInfo(img);

      let canvas = document.createElement('canvas');

      let ctx = canvas.getContext('2d');

      canvas.width = resizeInfo.trgWidth;
      canvas.height = resizeInfo.trgHeight;

      let _ref, _ref1, _ref2, _ref3;

      this._drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);

      let thumbnail = canvas.toDataURL('image/png');

      this.set('loading', false);
      this.set('thumbnail', thumbnail);
      Promise.resolve(thumbnail);
    });
  }

  _resizeInfo(img) {
    let info, srcRatio, trgRatio;
    info = {
      srcX: 0,
      srcY: 0,
      srcWidth: img.width,
      srcHeight: img.height
    };
    srcRatio = img.width / img.height;
    trgRatio = this.get('thumbnailWidth') / this.get('thumbnailHeight');
    if (img.height < this.get('thumbnailHeight') || img.width < this.get('thumbnailWidth')) {
      info.trgHeight = info.srcHeight;
      info.trgWidth = info.srcWidth;
    } else {
      if (srcRatio > trgRatio) {
        info.srcHeight = img.height;
        info.srcWidth = info.srcHeight * trgRatio;
      } else {
        info.srcWidth = img.width;
        info.srcHeight = info.srcWidth / trgRatio;
      }
    }
    info.srcX = (img.width - info.srcWidth) / 2;
    info.srcY = (img.height - info.srcHeight) / 2;

    if (info.trgWidth == null) {
      info.trgWidth = this.get('thumbnailWidth');
    }
    if (info.trgHeight == null) {
      info.trgHeight = this.get('thumbnailHeight');
    }
    return info;
  }

  _drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    let vertSquashRatio;
    vertSquashRatio = this._detectVerticalSquash(img);
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);

  }

  _detectVerticalSquash(img) {
    let alpha, canvas, ctx, data, ey, ih, py, ratio, sy;
    // iw = img.naturalWidth;
    ih = img.naturalHeight;
    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(0, 0, 1, ih).data;
    sy = 0;
    ey = ih;
    py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    ratio = py / ih;
    if (ratio === 0) {
      return 1;
    } else {
      return ratio;
    }
  }
}
