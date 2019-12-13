import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { H5P } from 'h5p-standalone'; // ES6
import { run } from '@ember/runloop';

export default class H5pComponent extends Component {
  async renderH5P(el) {
    const h5pLocation = './workspace';

    const options = {
      id: 'lesson-one', // Optional unique ID, by default will be randomly generated
      frameJs: './frame.bundle.js',
      frameCss: './styles/h5p.css'
    };

    const displayOptions = { // Customise the look of the H5P
      frame: true,
      copyright: true,
      embed: false,
      download: false,
      icon: true,
      export: false
    };

    const h5p = await new H5P(el, h5pLocation, options, displayOptions);
  }
}
