import { createSelector } from 'reselect';
import { reduxState } from '../../config';
import { isExpired } from '../../utils';

const { AUTH } = reduxState;

export const selectHasAuth = state => typeof state[AUTH] !== 'undefined';
export const selectAuth = state => state[AUTH];
export const selectRefreshToken = state => state[AUTH].refreshToken;

/**
 * Will return is authenticated user is still valid
 * @param  {Object} state
 * @return {Boolean}
 */
export const selectIsAuthenticated = createSelector(
  [selectHasAuth, selectAuth],
  (hasAuth, auth) => {
    if (!hasAuth) {
      return true;
    }

    const { accessToken, refreshToken, expiresAt } = auth;

    if (!(accessToken && refreshToken && expiresAt)) return false;

    return !isExpired(expiresAt);
  },
);
