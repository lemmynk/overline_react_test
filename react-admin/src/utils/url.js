// @flow

const stringify = (query: Object): string => {
  const parts = Object.keys(query).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`,
  );
  return parts.join('&');
};

// eslint-disable-next-line import/prefer-default-export
export const queryUrl = (url: string, query: Object): string => {
  const queryString = stringify(query);
  return [url, queryString].join('?');
};
