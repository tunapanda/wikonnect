import { helper } from '@ember/component/helper';

export default helper(function ellipsize(params) {
  const sentence = params[0];
  const length = params[1];
  const ellipseSymbol = params[2] || '...';
  if (!sentence || sentence.length < length) {
    return sentence;
  }
  return sentence.substr(0, length) + ellipseSymbol;
});
