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

/**
 * Will return pattern parameters
 * - prefix: anything before 000 at the end
 * - length: 000 patrn length
 */
const patternMetrics = pattern => {
  const regEx = /0+$/g;
  const match = pattern.match(regEx).shift();
  return {
    length: match.length,
    prefix: pattern.slice(0, pattern.length - match.length),
  };
};

/**
 * Will calculate next according to pattern
 */
const patternNext = (prefix, length, last) => {
  const regEx = /\d+$/g;
  const match = last.match(regEx).shift();
  const next = parseInt(match, 10) + 1;
  if (Number.isNaN(next)) {
    return `${prefix}${'1'.padStart(length, '0')}`;
  }
  return `${prefix}${next.toString().padStart(length, '0')}`;
};

module.exports = {
  isArray,
  isObject,
  sortByKey,
  patternMetrics,
  patternNext,
};
