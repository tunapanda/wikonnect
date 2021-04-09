import { helper } from '@ember/component/helper';

/**
 * Allows one to execute a function that evaluates an expression (has return value)
 * The function is passed as first argument. One must decorate the function with `@action` to access `this` context
 */
export default helper(function exec(params) {
  const callbackRef = params[0];
  const args = Array.prototype.slice.call(params, 0);
  return callbackRef.call(...args);
});
