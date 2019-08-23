import { take, put, all, delay } from 'redux-saga/effects';
import { DO_INIT_APP } from '@newtash/react-app-core';
import { fetchArtPdvs, fetchArtGroups } from '../actions';

function* initAppStoreFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    yield delay(100);

    yield all([put(fetchArtPdvs()), put(fetchArtGroups())]);
  }
}

export default [initAppStoreFlow];
