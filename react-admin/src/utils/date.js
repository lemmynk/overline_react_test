// @flow
import { TOKEN_BUFFER } from '../config';

export const now = (): number => parseInt(new Date().getTime() / 1000, 0);

export const isExpired = (expiresAt: number): boolean =>
  expiresAt - TOKEN_BUFFER < now();

export const expiresAt = (expiresIn: number = 0): number =>
  parseInt(new Date().getTime() / 1000, 0) + expiresIn;
