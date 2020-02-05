export const DO_FETCH_APP_CONFIG = '@newtash/react-app/DO_FETCH_APP_CONFIG';
export const DO_UPDATE_APP_CONFIG = '@newtash/react-app/DO_UPDATE_APP_CONFIG';

export const SET_APP_CONFIG = '@newtash/react-app/SET_APP_CONFIG';
export const SET_APP_CONFIG_VERISON =
  '@newtash/react-app/SET_APP_CONFIG_VERSION';

export const doFetchAppConfig = () => ({
  type: DO_FETCH_APP_CONFIG,
});

export const doUpdateAppConfig = (key, id, data) => ({
  type: DO_UPDATE_APP_CONFIG,
  payload: { key, id, data },
});

export const setAppConfig = config => ({
  type: SET_APP_CONFIG,
  payload: config,
});

export const setAppConfigVersion = version => ({
  type: SET_APP_CONFIG_VERISON,
  payload: version,
});
