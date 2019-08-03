import { take, put, all } from 'redux-saga/effects';
import { DO_INIT_APP } from '@newtash/react-app-core';
import { fetchArtPdvs } from '../actions';

function* initAppFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    // eslint-disable-next-line no-console
    console.log('...do init app...');

    yield all([put(fetchArtPdvs())]);
  }
}

export default [initAppFlow];
