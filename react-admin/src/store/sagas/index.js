/* eslint-disable no-console */
import { take } from 'redux-saga/effects';
import appSagas from './app';
// import appConfigSagas from './appConfig';
import authSagas from './auth';

function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    // const state  = yield select()

    console.groupCollapsed(`dispatching action => ${action.type}`);
    console.log(
      `payload => ${
        typeof action.payload === 'object'
          ? JSON.stringify(action.payload, null, 2)
          : action.payload
      }`,
    );
    console.groupEnd();
  }
}

export const watchAndLogSagas = [watchAndLog];
export const allSagas = [...appSagas, ...authSagas];
// export const baseSagas = [...appSagas, ...authSagas];
// export const withAuthSagas = [...appSagas, ...appConfigSagas, ...authSagas];
