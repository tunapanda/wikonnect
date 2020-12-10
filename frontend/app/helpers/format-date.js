import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatDate(params/*, hash*/) {
  return moment(params).format('MMMM d, YYYY');
});
