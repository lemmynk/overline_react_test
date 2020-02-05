/* eslint-disable no-console */
import { take } from 'redux-saga/effects';
// import { take, put } from 'redux-saga/effects';
import { DO_INIT_APP } from '../actions';
// import { DO_INIT_APP, doFetchAppConfig } from '../actions';
// import { isWithApiConfig, isWithApi } from '../../utils';

function* appInitFlow() {
  while (true) {
    yield take(DO_INIT_APP);

    console.log('...do init app...');
    // Do check for config if allowed
    // if (isWithApiConfig() && isWithApi()) {
    //   yield put(doFetchAppConfig());
    // }
  }
}

export default [appInitFlow];
