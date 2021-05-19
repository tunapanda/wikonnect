export default function validateCrossField(options = {}) {
  return (key, newValue, oldValue, changes, content) => {
    const operator = options.operator || '====';
    const siblingKey = options.on;

    if (!siblingKey) {
      return `'opt' field parameter to compare against is required`;
    }

    if (!Object.keys(evalExpr).includes(operator)) {
      return `Only comparison operators (>,<,==,<=,===,>=,!==) are supported.`;
    }
    const model = { ...content, ...changes }; // ensure we have up to date data

    if (!model[siblingKey]) {
      return `'opt' field not found on the model`; // not sure if this is okay
    }
    if (evalExpr[operator](+newValue, +model[siblingKey])) {
      return true;
    }
    return `${newValue} is not ${operator} ${model[siblingKey]}`;
  };
}

const evalExpr = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '==': (a, b) => a == b,
  '===': (a, b) => a === b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  '!==': (a, b) => a !== b,
};
