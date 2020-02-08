// @flow
import { now } from './date';

export const rand = (size: number = 6): string =>
  Math.random()
    .toString()
    .substr(2, size + 2);

export const timedRand = (size: number = 6): string =>
  `${now().toString()}-${rand(size)}`;
