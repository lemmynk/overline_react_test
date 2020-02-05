export const DO_AUTHENTICATION = '@newtash/react-app/DO_AUTHENTICATION';
export const DO_REFRESH_TOKEN = '@newtash/react-app/DO_REFRESH_TOKEN';
export const DO_LOGOUT = '@newtash/react-app/DO_LOGOUT';

export const SET_ACCESS_TOKEN = '@newtash/react-app/SET_ACCESS_TOKEN';
export const CLEAR_ACCESS_TOKEN = '@newtash/react-app/CLEAR_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = '@newtash/react-app/SET_REFRESH_TOKEN';
export const CLEAR_REFRESH_TOKEN = '@newtash/react-app/CLEAR_REFRESH_TOKEN';
export const SET_EXPIRES_AT = '@newtash/react-app/SET_EXPIRES_AT';
export const CLEAR_EXPIRES_AT = '@newtash/react-app/CLEAR_EXPIRES_AT';

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
