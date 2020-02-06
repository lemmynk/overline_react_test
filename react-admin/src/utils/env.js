// @flow
export const isProduction = (): boolean =>
  process.env.REACT_APP_ENV === 'production';

export const isWithApi = (): boolean =>
  process.env.REACT_APP_WITH_API === 'true';

export const isWithApiConfig = (): boolean =>
  process.env.REACT_APP_WITH_CONFIG === 'true';

export const authUrl = (): string => {
  const { REACT_APP_AUTH_URL } = process.env;
  if (!REACT_APP_AUTH_URL) {
    throw new Error('Auth url definition missing');
  }
  return REACT_APP_AUTH_URL;
};
