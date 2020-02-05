// @flow

declare type StoreFactoryProps = {
  blacklist: Array<string>,
  reducers: any,
  sagas: Array<any>,
  purgeStore: boolean,
};
