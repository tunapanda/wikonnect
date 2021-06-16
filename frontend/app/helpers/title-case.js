import { helper } from '@ember/component/helper';
import { titleCase as _titleCase } from 'title-case';

export default helper(function titleCase(params /*, hash*/) {
  if (typeof params[0] !== 'string') {
    throw new TypeError(`Expected a string, got a ${typeof params[0]}`);
  }
  return _titleCase(params[0]);
});
