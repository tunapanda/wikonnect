import { tracked } from '@glimmer/tracking';
import { helper } from '@ember/component/helper';
import { action } from '@ember/object';

/**
 * @template T
 * @type {WeakMap<Promise<T>, AsyncData<T, any>>}
 */
const PROMISE_STATE = new WeakMap();

/**
 * The state of a promise.
 *
 * @template T The value from the promise if it resolves.
 * @template E The error of the promise if it rejects.
 */
class AsyncData {
  /** @type {Promise<T>} */
  #promise;

  /**
   * @param {Promise<T>} promise The promise to load.
   */
  constructor(promise) {
    this.#promise = promise;
  }

  /**
   * The resolution state of the promise: `'LOADING'` or `'LOADED'` or `'ERROR'`
   * @type {'LOADING' | 'LOADED' | 'ERROR'}
   */
  @tracked state = 'LOADING';

  /**
   * @type {T | null}
   * @private
   */
  @tracked _value = null;

  /**
   * @type {E | null}
   * @private
   */
  @tracked _error = null;

  // The following getters allow us to refactor our internal management of the
  // async state at will. For example, we could throw debug assertions when
  // accessing properties at inappropriate times in the lifecycle (like a runtime
  // [algebraic data type][ADT]), or make the underlying state *actually* be an
  // ADT via TypeScript, etc.
  //
  // [ADT]: https://jnkr.tech/blog/introduction-to-algebraic-data-types

  /**
   * The value of the resolved promise. `null` if `isLoaded` is not `true`
   *
   * @type {T | null}
   * @public
   */
  get value() {
    return this._value;
  }

  /**
   * The error of the rejected promise. `null` if `isError` is not `true`
   *
   * @type {E | null}
   * @public
   */
  get error() {
    return this._error;
  }

  /**
   * If the state is LOADING.
   *
   * @type {Boolean}
   * @public
   */
  get isLoading() {
    return this.state === 'LOADING';
  }

  /**
   * If the state is LOADED.
   *
   * @type {Boolean}
   * @public
   */
  get isLoaded() {
    return this.state === 'LOADED';
  }

  /**
   * If the state is ERROR.
   *
   * @type {Boolean}
   * @public
   */
  get isError() {
    return this.state === 'ERROR';
  }

  /**
   * Resolves the promise with the specified value
   *
   * @param {T} value
   * @return {void}
   */
  @action resolveWith(value) {
    this.state = 'LOADED';
    this._value = value;
  }

  /**
   * Rejects the promise and throws with the specified error
   *
   * @param {E} error
   * @return {void}
   */
  @action rejectWith(error) {
    this.state = 'ERROR';
    this._error = error;
  }

  @action then(callback) {
    this.#promise = this.#promise.then(callback);
    return this;
  }

  @action catch(callback) {
    this.#promise = this.#promise.catch(callback);
    return this;
  }

  @action finally(callback) {
    this.#promise = this.#promise.finally(callback);
    return this;
  }
}

/**
 * This function takes a promise and returns a LoadState object which contains
 * information about the loading state as well as the resolved value or thrown
 * error.
 *
 * @template T The type of the value from the promise if it resolves.
 * @template E The error of the promise if it rejects.
 * @param {T | Promise<T>} data The promise we want to operate on.
 * @returns {AsyncData<T, E>} An object containing the state(, value, and error).
 */
export function load(data) {
  const promise =
    data == null || typeof then !== 'function' ? Promise.resolve(data) : data;

  if (PROMISE_STATE.has(promise)) {
    return PROMISE_STATE.get(promise);
  }

  const result = new AsyncData(promise);

  promise.then(result.resolveWith, result.rejectWith);

  PROMISE_STATE.set(promise, result);

  return result;
}

export default helper(([promise]) => load(promise));
