import reduxState from '../reduxState';

const { APP_CONFIG } = reduxState;

export const selectAppConfigVersion = state => state[APP_CONFIG].version;
export const selectAppConfigData = state => state[APP_CONFIG].data;

export const selectAppConfigValue = state => (key, defaultValue = null) => {
  const data = selectAppConfigData(state);
  if (typeof data === 'undefined') {
    return defaultValue;
  }
  if (typeof data[key] === 'undefined') {
    return defaultValue;
  }
  return data[key];
};
