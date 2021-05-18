import { validateDate as dateValidator } from 'ember-changeset-validations/validators';

/**
 * Date validator provided by ember-changeset-validations does not accepts string dates
 * Following validator function will parse the date object and pass it through the lib validator
 * @param options
 * @returns function(): true || string
 */
export default function validateDate(options = {}) {
  return (key, newValue, oldValue, changes, content) => {
    if (newValue && !(newValue instanceof Date)) {
      newValue = Date.parse(newValue);
    }
    if (oldValue && !(oldValue instanceof Date)) {
      oldValue = Date.parse(oldValue);
    }
    console.log(newValue, oldValue);
    /*we will still pass all options although only first 2 args are currently utilized*/
    return dateValidator(options)(key, newValue, oldValue, changes, content);
  };
}
