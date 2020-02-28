import Component from '@glimmer/component';
import { H5P } from 'h5p-standalone'; // ES6
import { action } from '@ember/object';
import { inject } from '@ember/service';


export default class H5pComponent extends Component {
  @inject me;
  @action
  async renderH5P(el) {
    const h5pLocation = this.args.location;

    const options = {
      frameJs: '/h5p/frame.bundle.js',
      frameCss: '/h5p/h5p.css'
    };
    this.get('currentUser.model').then(() => {
      H5P.externalDispatcher.on('xAPI', this.xAPI.bind(this));
    });

    await new H5P(el, h5pLocation, options);
  }
  xAPI(event) {
    this.send('action', event);
    console.log('action', event);

  }
}
