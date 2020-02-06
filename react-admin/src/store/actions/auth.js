import { NS } from '../reduxState';

export const DO_AUTHENTICATION = `${NS}/DO_AUTHENTICATION`;
export const DO_REFRESH_TOKEN = `${NS}/DO_REFRESH_TOKEN`;
export const DO_LOGOUT = `${NS}/DO_LOGOUT`;

export const SET_ACCESS_TOKEN = `${NS}/SET_ACCESS_TOKEN`;
export const CLEAR_ACCESS_TOKEN = `${NS}/CLEAR_ACCESS_TOKEN`;
export const SET_REFRESH_TOKEN = `${NS}/SET_REFRESH_TOKEN`;
export const CLEAR_REFRESH_TOKEN = `${NS}/CLEAR_REFRESH_TOKEN`;
export const SET_EXPIRES_AT = `${NS}/SET_EXPIRES_AT`;
export const CLEAR_EXPIRES_AT = `${NS}/CLEAR_EXPIRES_AT`;

export const doAuthentication = handshakeCode => ({
  type: DO_AUTHENTICATION,
  payload: handshakeCode,
});

export const doRefreshToken = () => ({
  type: DO_REFRESH_TOKEN,
});

export const doLogout = () => ({
  type: DO_LOGOUT,
});

export const setAccessToken = token => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});

export const clearAccessToken = () => ({
  type: CLEAR_ACCESS_TOKEN,
});

export const setRefreshToken = token => ({
  type: SET_REFRESH_TOKEN,
  payload: token,
});

export const clearRefreshToken = () => ({
  type: CLEAR_REFRESH_TOKEN,
});

export const setExpiresAt = expiresAt => ({
  type: SET_EXPIRES_AT,
  payload: parseInt(expiresAt, 0),
});

export const clearExpiresAt = () => ({
  type: CLEAR_EXPIRES_AT,
});
