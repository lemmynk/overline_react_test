import { take, put, all } from 'redux-saga/effects';
import { DO_INIT_STORE } from '@newtash/react-app-core';
import { fetchArtPdvs, fetchArtGroups } from '../actions';

function* initAppStoreFlow() {
  while (true) {
    yield take(DO_INIT_STORE);

    yield all([put(fetchArtPdvs()), put(fetchArtGroups())]);
  }
}

export default [initAppStoreFlow];
