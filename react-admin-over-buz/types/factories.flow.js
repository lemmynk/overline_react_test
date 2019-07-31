// @flow

declare type StoreFactoryProps = {
  appBlacklist: Array<string>,
  appReducers: Array<string>,
  appSagas: Array<string>,
  purgeStore: boolean,
};
