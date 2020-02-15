/* eslint-disable import/prefer-default-export */
// @flow

const propToValue = (value: any) => {
  const numValue = Number(value);
  if (!Number.isNaN(numValue)) {
    return numValue;
  }
  return value;
};

export const sortByKey = (prop: string, sortAsc: boolean = true) => (
  a: Object,
  b: Object,
) => {
  const valueA = propToValue(a[prop]);
  const valueB = propToValue(b[prop]);
  if (valueA > valueB) {
    return sortAsc ? 1 : -1;
  }
  if (valueA < valueB) {
    return sortAsc ? -1 : 1;
  }
  return 0;
};
