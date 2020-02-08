import { NS } from '../reduxState';

export const DO_FETCH_APP_CONFIG = `${NS}/DO_FETCH_APP_CONFIG`;

export const SET_APP_CONFIG = `${NS}/SET_APP_CONFIG`;
export const SET_APP_CONFIG_VERISON = `${NS}/SET_APP_CONFIG_VERSION`;

export const doFetchAppConfig = () => ({
  type: DO_FETCH_APP_CONFIG,
});

export const setAppConfig = config => ({
  type: SET_APP_CONFIG,
  payload: config,
});

export const setAppConfigVersion = version => ({
  type: SET_APP_CONFIG_VERISON,
  payload: version,
});
