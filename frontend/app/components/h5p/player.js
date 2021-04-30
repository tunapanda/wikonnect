import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { H5P as H5PStandalone } from 'h5p-standalone';
import config from 'wikonnect/config/environment';

export default class H5pPlayerComponent extends Component {
  @service router;

  @tracked contentId = this.args.contentId;
  @tracked contentUrl = this.args.location;

  @action
  async initPlayer(elem) {
    let options = {
      h5pJsonPath: this.contentUrl,
      frameJs: '/h5p/frame.bundle.js',
      frameCss: '/h5p/h5p.css',
    };
    if (this.contentId) {
      options = {
        h5pJsonPath: `/h5p/content/${this.contentId}`,
        contentJsonPath: `/h5p/content/${this.contentId}`,
        librariesPath: `/h5p/libraries`,
        frameJs: '/h5p/frame.bundle.js',
        frameCss: '/h5p/h5p.css',
        frame: true,
        copyright: true,
        export: true,
        downloadUrl: config.proxyUrl + `/api/v1/h5p/download/${this.contentId}`,
        //including this with false value until implementation on H5P player
        embed: false,
      };
    }

    await new H5PStandalone(elem, options);

    // eslint-disable-next-line no-undef
    if (this.args.onxAPIStatement && H5P) {
      // eslint-disable-next-line no-undef
      H5P.externalDispatcher.on('xAPI', (event) => {
        this.args.onxAPIStatement(event);
      });
    }
  }
}
