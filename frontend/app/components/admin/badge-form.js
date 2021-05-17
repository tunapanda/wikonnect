import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Uploader from '../../utils/uploader';

export default class AdminBadgeFormComponent extends Component {
  @service store;
  @service notify;

  @tracked tempSelectedBadgeIcon;

  get model() {
    const obj = this.args.model;
    if (obj && obj.expiry) {
      obj.expiry = this.parseDate(obj.expiry);
    }
    return obj;
  }

  get triggers() {
    return this.store.peekAll('trigger');
  }

  parseDate(d) {
    const obj = new Date(d);
    return obj.toISOString().substr(0, 10);
  }

  @action
  async submitForm(model) {
    model.expiry = new Date(model.expiry);

    const original = this.store.peekRecord('badge', model.id);

    Object.keys(model).map((key) => {
      original[key] = model[key];
    });
    try {
      await original.save();
      if (!this.tempSelectedBadgeIcon) {
        // notify the user everything is successful
      }
    } catch (e) {
      original.rollbackAttributes();
    }
    if (this.tempSelectedBadgeIcon) {
      //upload icon
      this.uploader = Uploader.create({
        file: this.tempSelectedBadgeIcon,
        filename: this.tempSelectedBadgeIcon.name,
      });
      try {
        await this.uploader.startUpload(
          [
            this.store.adapterFor('application').host,
            this.store.adapterFor('application').urlPrefix(),
            'badges',
            model.id,
            '/badge-image',
          ].join('/')
        );
      } catch (e) {}
    }
  }

  @action
  triggerSelected(setFormValue, evt) {
    if (setFormValue) {
      setFormValue(evt.target.selectedOptions[0].value);
    }
  }

  @action
  onBadgeIconSelect(files) {
    if (files.length > 1) {
      this.notify.error('You can only upload one file');
    } else {
      this.tempSelectedBadgeIcon = files[0];
    }
  }

  get selectedBadgeIconPreviewSrc() {
    if (this.tempSelectedBadgeIcon) {
      return URL.createObjectURL(this.tempSelectedBadgeIcon);
    }

    if (this.model && (this.model.iconUrl || this.model.badgeUri)) {
      return this.model.iconUrl || this.model.badgeUri;
    }
    return '';
  }

  @action
  resetSelectedBadgeIcon() {
    //  this.tempSelectedBadgeIcon = null; //TODO figure out how to reset this safely
  }
}
