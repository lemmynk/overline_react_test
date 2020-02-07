const isArray = arr =>
  typeof arr === 'object' && typeof arr.length !== 'undefined';
const isObject = obj =>
  typeof obj === 'object' && typeof obj.length === 'undefined';

const sortByKey = (key, sortAscending = true) => (a, b) => {
  if (a[key] > b[key]) {
    return sortAscending ? 1 : -1;
  }
  if (a[key] < b[key]) {
    return sortAscending ? -1 : 1;
  }
  return 0;
};

module.exports = {
  isArray,
  isObject,
  sortByKey,
};
