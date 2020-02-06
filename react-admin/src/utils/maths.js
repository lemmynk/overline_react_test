// @flow
import { now } from './date';

export const rand = (size: number = 6): string =>
  Math.random()
    .toString()
    .substr(2, size + 2);

export const timedRand = (size: number = 6): string =>
  `${now().toString()}-${rand(size)}`;

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
