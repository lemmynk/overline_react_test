// @flow
import { storeFactory } from '@newtash/core/factories';
import { blacklist } from '../store/reduxState';
import reducers from '../store/reducers';
import { watchAndLogSagas, allSagas } from '../store/sagas';

const purgeStore = false;
const withWatchAndLog = true;
// const withAuth = false;

const sagas = withWatchAndLog ? [...watchAndLogSagas, ...allSagas] : allSagas;

const storeProps = {
  // withAuth,
  blacklist,
  reducers,
  sagas,
  purgeStore,
};

export default () => storeFactory(storeProps);
