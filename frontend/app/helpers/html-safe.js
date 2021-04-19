import { helper } from '@ember/component/helper';
import { htmlSafe as sf } from '@ember/template';

export default helper(function htmlSafe(params) {
  return sf(params);
});
