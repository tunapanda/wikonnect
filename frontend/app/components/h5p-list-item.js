import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class H5pListItemComponent extends Component {
  @service config;

  unit = 'second';
  color = Math.floor(Math.random() * 16777215).toString(16);

  get timeDiff() {
    const timeDiffInMilliseconds = new Date(this.args.chapter.createdAt) - new Date();

    let value = timeDiffInMilliseconds / 1000;

    // Convert to minutes if more than 60sec.
    if (Math.abs(value) > 60) {
      value /= 60;
      this.unit = 'minute';

      // Convert to hours if more than 60min.
      if (Math.abs(value) > 60) {
        value /= 60;
        this.unit = 'hour';

        // Convert to days if more than 24hr.
        if (Math.abs(value) > 24) {
          value /= 24;
          this.unit = 'day';

          // Convert to weeks if more than 7d.
          if (Math.abs(value) > 7) {
            value /= 7;
            this.unit = 'week';

            // Convert to months if more than 4weeks.
            if (Math.abs(value) > 4) {
              value /= 4;
              this.unit = 'month';

              // Convert to years if more than 12 months.
              if (Math.abs(value) > 12) {
                value /= 12;
                this.unit = 'year';
              }
            }
          }
        }
      }
    }

    return Math.floor(value);
  }
}
