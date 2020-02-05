import reduxState from '../reduxState';

const { APP } = reduxState;

export const selectAppRedirectUrl = state => state[APP].redirectUrl;

export const selectAppConfigVersion = state => state[APP].configVersion;
export const selectAppConfig = state => state[APP].config;
export const selectAppConfigItem = state => key => state[APP].config[key];

export const selectAppConfigValue = state => key => {
  const item = selectAppConfigItem(state)(key);
  const { type, value } = item;
  if (type === 'number') {
    return parseFloat(value);
  }
  if (type === 'boolean') {
    return Boolean(value);
  }
  if (type === 'json') {
    try {
      return JSON.parse(value);
    } catch (err) {
      const msg = `Attempt to parse config value (${value}) failed`;
      // eslint-disable-next-line no-console
      console.error(msg, err);
    }
  }
  return value;
};
