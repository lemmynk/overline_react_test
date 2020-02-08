import { take, put, all } from 'redux-saga/effects';
import {
  DO_INIT_APP,
  doFetchAppConfig,
  fetchArtPdvs,
  fetchArtGroups,
} from '../actions';

function* appInitFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    // eslint-disable-next-line no-console
    console.log('...do init app...');

    yield all([
      put(doFetchAppConfig()),
      put(fetchArtPdvs()),
      put(fetchArtGroups()),
    ]);
  }
}

export default [appInitFlow];
