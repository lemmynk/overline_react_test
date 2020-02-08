/* eslint-disable no-console */
import { take, put, all } from 'redux-saga/effects';
// import { take, put } from 'redux-saga/effects';
import { DO_INIT_APP, doFetchAppConfig } from '../actions';

function* appInitFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    console.log('...do init app...');
    // Do check for config if allowed
    yield all([put(doFetchAppConfig())]);
  }
}

export default [appInitFlow];
