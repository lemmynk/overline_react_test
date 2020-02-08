// @flow

/**
 * Sort Array of Object(s) by object key
 */
export const sortByKey = (prop: string, sortAsc: boolean = true) => (
  a: Object,
  b: Object,
) => {
  if (a[prop] > b[prop]) {
    return sortAsc ? 1 : -1;
  }
  if (a[prop] < b[prop]) {
    return sortAsc ? -1 : 1;
  }
  return 0;
};

/**
 * Combine arrays of Object(s) by unique object key
 */
export const combineByKey = (
  a: Array<Object>,
  b: Array<Object>,
  key: string,
) => {
  const combined = [];
  // const aKeys = a.map(item => item[key]);
  const bKeys = b.map(item => item[key]);

  a.forEach(item => {
    if (!bKeys.includes(item[key])) {
      combined.push(item);
    }
  });
  b.forEach(item => {
    combined.push(item);
  });

  /*
  console.groupCollapsed('combineByKey');
  console.log('a:', a);
  console.log('b:', b);
  console.log('aKeys:', aKeys);
  console.log('bKeys:', bKeys);
  console.log('combined:', combined);
  console.groupEnd();
  */

  return combined;
};
