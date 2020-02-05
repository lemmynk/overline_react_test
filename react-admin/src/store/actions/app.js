import { NS } from '../reduxState';

export const DO_INIT_APP = `${NS}/DO_INIT_APP`;
export const DO_INIT_STORE = `${NS}/DO_INIT_STORE`;

export const SET_APP_REDIRECT_URL = `${NS}/SET_APP_REDIRECT_URL`;

export const doInitApp = () => ({
  type: DO_INIT_APP,
});

export const doInitStore = () => ({
  type: DO_INIT_STORE,
});

export const setAppRedirectUrl = url => ({
  type: SET_APP_REDIRECT_URL,
  payload: url,
});
