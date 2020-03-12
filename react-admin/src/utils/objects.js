// eslint-disable-next-line import/prefer-default-export
export const cleanUndefined = sourceObj => {
  const obj = {};
  Object.keys(sourceObj).forEach(key => {
    if (typeof sourceObj[key] !== 'undefined') {
      obj[key] = sourceObj[key];
    }
  });
  return obj;
};

const isEmpty = val =>
  typeof val === 'undefined' || val === null || val.toString().length === 0;

export const cleanEmpty = sourceObj => {
  const obj = {};
  Object.keys(sourceObj).forEach(key => {
    if (!isEmpty(sourceObj[key])) {
      obj[key] = sourceObj[key];
    }
  });
  return obj;
};
