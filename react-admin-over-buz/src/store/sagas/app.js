import { take } from 'redux-saga/effects';
import { DO_INIT_APP } from '@newtash/react-app-core';

function* initAppFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    // eslint-disable-next-line no-console
    console.log('...do init app...');
  }
}

export default [initAppFlow];
