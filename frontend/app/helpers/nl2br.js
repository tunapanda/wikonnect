import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import Ember from 'ember';


export default helper(function nl2br(str) {
  const value = Ember.Handlebars.Utils.escapeExpression(str);

  return htmlSafe(value.replace(/\n/g, '<br/>'));
});
