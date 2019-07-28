// @flow
declare type ReactRouterHistoryLocation = {
  pathname: string,
  search: string,
  hash: string,
};

declare type ReactRouterHistory = {
  location: ReactRouterHistoryLocation,
  goBack: () => void,
  push: string => void,
};

declare type ReactRouterMatch = {
  isExact: boolean,
  path: string,
  url: string,
  params: any,
};
