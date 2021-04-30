import { helper } from '@ember/component/helper';

export default helper(function relativeTime(params /*, hash*/) {
  const now = new Date();
  const start = new Date(params);

  const timeDiffInMilliseconds = start.getTime() - now.getTime();

  let unit = 'second';
  let value = timeDiffInMilliseconds / 1000;

  // Convert to minutes if more than 60sec.
  if (Math.abs(value) > 60) {
    value /= 60;
    unit = 'minute';

    // Convert to hours if more than 60min.
    if (Math.abs(value) > 60) {
      value /= 60;
      unit = 'hour';

      // Convert to days if more than 24hr.
      if (Math.abs(value) > 24) {
        value /= 24;
        unit = 'day';

        // Convert to weeks if more than 7d.
        if (Math.abs(value) > 7) {
          value /= 7;
          unit = 'week';

          // Convert to months if more than 4weeks.
          if (Math.abs(value) > 4) {
            value /= 4;
            unit = 'month';

            // Convert to years if more than 12 months.
            if (Math.abs(value) > 12) {
              value /= 12;
              unit = 'year';
            }
          }
        }
      }
    }
  }

  const lang = window && window.navigator ? window.navigator.language : 'en';
  const formatter = new Intl.RelativeTimeFormat(lang);
  return formatter.format(Math.floor(value), unit);
});
