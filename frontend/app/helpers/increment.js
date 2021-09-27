import { helper } from '@ember/component/helper';

export default helper(function increment(params) {
  return Number(params[0]) + (params[1] ? Number(params[1]) : 1);
});
